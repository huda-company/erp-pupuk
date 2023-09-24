import { NextResponse } from "next/server";

import parseQueryParameters from "@/utils/parseQueryParameters";

import Cashflow from "@/models/Cashflow";

import startDb from "@/lib/db";

export const GET = async (req: Request) => {
  const {
    q: qVal,
    fields: fieldsVal,
    sd: startDate,
    ed: endDate,
  } = parseQueryParameters(req.url);

  const fieldsArray = fieldsVal.split(",");

  // Explicitly define the type of the `fields` object
  const fields: {
    $or: Array<{ [key: string]: { $regex: RegExp } }>;
    date: { $gte: Date; $lte: Date }; // Filter for date range
  } = {
    $or: [],
    date: {
      $gte: new Date(startDate || Date.now().toString()), // Replace with your start date
      $lte: new Date(endDate || Date.now().toString()), // Replace with your end date
    },
  };

  for (const field of fieldsArray) {
    fields.$or.push({ [field]: { $regex: new RegExp(qVal, "i") } });
  }

  const filterDateRangeOnly = {
    date: {
      $gte: new Date(startDate || Date.now().toString()), // Replace with your start date
      $lte: new Date(endDate || Date.now().toString()), // Replace with your end date
    },
  };

  const theFilter =
    qVal === undefined || qVal.trim() === "" ? filterDateRangeOnly : fields;

  await startDb();

  try {
    const results = await Cashflow.find(theFilter)
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
