import { NextResponse } from "next/server";

import Item from "@/models/Item";

import { MODULE_NAME } from "@/app/(admin_route)/admin/purchase/config";
import startDb from "@/lib/db";

export const PATCH = async (req: Request) => {
  const idVal = req.url.split(`/${MODULE_NAME}/update/`)[1];

  const bodyParam = await req.json();

  if (idVal) {
    try {
      await startDb();

      // Find document by id and updates with the required fields
      const result = await Item.findOneAndUpdate(
        { _id: idVal, removed: false },
        bodyParam,
        {
          new: true, // return the new result instead of the old one
          runValidators: true,
        }
      ).exec();

      return NextResponse.json({
        success: true,
        result,
        message: `Successfully updated ${MODULE_NAME}`,
      });
    } catch (err) {
      return NextResponse.json(
        {
          success: false,
          result: [],
          message: `Error update ${MODULE_NAME}`,
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
