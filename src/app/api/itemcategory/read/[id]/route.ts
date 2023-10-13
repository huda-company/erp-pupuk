import { NextResponse } from "next/server";

import ItemCategory from "@/models/ItemCategory";

import startDb from "@/lib/db";

export const GET = async (req: Request) => {
  const idVal = req.url.split("/itemcategory/read/")[1];

  if (idVal) {
    try {
      await startDb();

      // Find document by id and updates with the required fields
      const result = await ItemCategory.findOne({
        _id: idVal,
        removed: false,
      });

      return NextResponse.json(
        {
          success: true,
          result,
          message: "Successfully retrieved",
        },
        { status: 200 }
      );
    } catch (err) {
      return NextResponse.json(
        {
          success: false,
          result: [],
          message: "Error read ItemCategory",
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
