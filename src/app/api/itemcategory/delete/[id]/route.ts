import { NextResponse } from "next/server";

import SupplierModel from "@/models/Supplier";

import startDb from "@/lib/db";

export const DELETE = async (req: Request) => {
  const idVal = req.url.split("/supplier/delete/")[1];

  if (idVal) {
    try {
      await startDb();

      const updates = {
        removed: true,
      };

      const result = await SupplierModel.findOneAndUpdate(
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
          message: "Successfully deleted",
        },
        { status: 200 }
      );
    } catch (err) {
      return NextResponse.json(
        {
          success: false,
          result: [],
          message: "Error delete supplier",
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
