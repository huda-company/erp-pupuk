import { NextResponse } from "next/server";

import Cashflow from "@/models/Cashflow/Cashflow";

import startDb from "@/lib/db";

export const GET = async (req: Request) => {
  const idVal = req.url.split("/cashflow/read/")[1];

  if (idVal) {
    try {
      await startDb();

      // Find document by id and updates with the required fields
      const result = await Cashflow.findOne({
        _id: idVal,
        removed: false,
      })
        .populate("cashflowCategory")
        .populate("createdBy");

      return NextResponse.json(
        {
          success: true,
          result,
          message: "Successfully retrieved Cashflow",
        },
        { status: 200 }
      );
    } catch (err) {
      return NextResponse.json(
        {
          success: false,
          result: [],
          message: "Error read Cashflow",
          error: err,
        },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json(
      {
        success: false,
        result: [],
        message: "id not found",
      },
      { status: 500 }
    );
  }
};
