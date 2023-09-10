import startDb from "@/lib/db";
import Item from "@/models/Item";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const idVal = req.url.split("/item/read/")[1];

  if (idVal) {
    try {
      await startDb();

      // Find document by id and updates with the required fields
      const result = await Item.findOne({
        _id: idVal,
        removed: false,
      });

      return NextResponse.json(
        {
          success: true,
          result,
          message: "Successfully retrieved item",
        },
        { status: 200 }
      );
    } catch (err) {
      return NextResponse.json(
        {
          success: false,
          result: [],
          message: "Error read item",
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
