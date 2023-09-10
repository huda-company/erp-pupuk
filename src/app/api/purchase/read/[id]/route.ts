import { NextResponse } from "next/server";

import BillDoc from "@/models/BillDoc/BillDoc";
import Purchase from "@/models/Purchase/Purchase";

import { MODULE_NAME } from "@/app/(admin_route)/admin/purchase/config";
import startDb from "@/lib/db";

export const GET = async (req: Request) => {
  const idVal = req.url.split(`/${MODULE_NAME}/read/`)[1];

  if (idVal) {
    try {
      await startDb();

      // Find document by id and updates with the required fields
      const result = await Purchase.findOne({
        _id: idVal,
        removed: false,
      })
        .populate("supplier")
        .populate("items.item")
        .lean();

      const findBillDoc = await BillDoc.find({
        purchase: idVal,
        removed: false,
      }).lean();

      return NextResponse.json(
        {
          success: true,
          result: {
            ...result,
            billdocs: findBillDoc,
          },
          message: `Successfully retrieved ${MODULE_NAME}`,
        },
        { status: 200 }
      );
    } catch (err) {
      return NextResponse.json(
        {
          success: false,
          result: [],
          message: `Error read ${MODULE_NAME} ${err}`,
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
