import { NextResponse } from "next/server";

import parseQueryParameters from "@/utils/parseQueryParameters";

import BillDoc from "@/models/BillDoc/BillDoc";

import startDb from "@/lib/db";

export const GET = async (req: Request) => {
  const {
    q: qVal,
    fields: fieldsVal, // show n items
  } = parseQueryParameters(req.url);

  if (qVal === undefined || qVal.trim() === "") {
    return NextResponse.json(
      {
        success: false,
        result: [],
        message: "No document found by this request",
      },
      { status: 202 }
    );
  }

  const fieldsArray = fieldsVal ? fieldsVal.split(",") : ["purchase"];

  // Explicitly define the type of the `fields` object
  const fields: { $or: Array<{ [key: string]: { $regex: RegExp } }> } = {
    $or: [],
  };

  for (const field of fieldsArray) {
    fields.$or.push({ [field]: { $regex: new RegExp(qVal, "i") } });
  }

  try {
    startDb();

    const results = await BillDoc.find(fields)
      .where("removed", false)
      .limit(10);

    if (results.length >= 1) {
      return NextResponse.json(
        {
          success: true,
          result: results,
          message: "Successfully found all documents",
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          result: [],
          message: "No document found by this request",
        },
        { status: 202 }
      );
    }
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        result: null,
        message: `Oops there is an Error, ${err}`,
        error: err,
      },
      { status: 500 }
    );
  }
};
