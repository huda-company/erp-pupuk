import { NextResponse } from "next/server";

import Purchase from "@/models/Purchase/Purchase";

import { MODULE_NAME } from "@/app/(admin_route)/admin/purchase/config";
import startDb from "@/lib/db";

export const DELETE = async (req: Request) => {
  const idVal = req.url.split(`/${MODULE_NAME}/delete/`)[1];

  if (idVal) {
    try {
      await startDb();

      const updates = {
        removed: true,
      };

      const result = await Purchase.findOneAndUpdate(
        { _id: idVal, removed: false },
        { $set: updates },
        {
          new: true, // return the new result instead of the old one
        }
      ).exec();

      return NextResponse.json(
        {
          success: true,
          result,
          message: `Successfully deleted ${MODULE_NAME}`,
        },
        { status: 200 }
      );
    } catch (err) {
      return NextResponse.json(
        {
          success: false,
          result: [],
          message: `Error delete item ${MODULE_NAME}`,
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
