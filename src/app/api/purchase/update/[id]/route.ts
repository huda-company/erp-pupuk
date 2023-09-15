import { NextResponse } from "next/server";

import Purchase from "@/models/Purchase";

import { APIPurchaseReq } from "@/services/purchase/types";

import { MODULE_NAME } from "@/app/(admin_route)/admin/purchase/config";
import startDb from "@/lib/db";

export const PATCH = async (req: Request) => {
  const idVal = req.url.split(`/${MODULE_NAME}/update/`)[1];

  const bodyParam: APIPurchaseReq = await req.json();

  if (idVal) {
    try {
      await startDb();

      //cant edit if po is removed or not found
      if (bodyParam.items.length == 0) {
        return NextResponse.json(
          {
            success: false,
            result: null,
            message: `items cannot be empty`,
          },
          { status: 400 }
        );
      }

      // Find document by id
      const checkPO = await Purchase.findOneAndUpdate(
        { _id: idVal, removed: false },
        bodyParam,
        {
          new: true, // return the new result instead of the old one
          runValidators: true,
        }
      ).lean();

      //cant edit if po is removed or not found
      if (!checkPO) {
        return NextResponse.json(
          {
            success: false,
            result: null,
            message: `PO not found`,
          },
          { status: 400 }
        );
      }

      // cant edit if status != draft
      if (checkPO.status.toLowerCase() !== "draft") {
        return NextResponse.json(
          {
            success: false,
            result: null,
            message: `po status is not "draft"`,
          },
          { status: 400 }
        );
      }

      // Find document by id and updates with the required fields
      const result = await Purchase.updateOne(
        { _id: idVal, removed: false },
        bodyParam,
        {
          new: true, // return the new result instead of the old one
          runValidators: true,
        }
      ).lean();

      return NextResponse.json({
        success: true,
        result: result,
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
