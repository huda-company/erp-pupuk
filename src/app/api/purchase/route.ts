import { NextResponse } from "next/server";

import Item from "@/models/Item/Item";
import Purchase from "@/models/Purchase/Purchase";
import { PurchaseDocument, PurchItem } from "@/models/Purchase/types";
import Supplier from "@/models/Supplier/Supplier";

import startDb from "@/lib/db";

import generatePoNumber from "./_utils/generatePoNo";
import { initStandardResp } from "../types";

export const POST = async (req: Request) => {
  try {
    const bodyParam = await req.json();

    // validate supplier
    const checkSupp = Supplier.findOne({
      _id: bodyParam.supplier,
      removed: false,
    }).lean();

    if (!checkSupp) {
      return NextResponse.json(
        {
          ...initStandardResp,
          message: "unknown supplier",
        },
        { status: 400 }
      );
    }

    // validate items
    bodyParam.items.forEach(async (element: any) => {
      const itemCheck = await Item.findOne({
        _id: element.item,
        removed: false,
      }).lean();

      if (!itemCheck) {
        return NextResponse.json(
          {
            ...initStandardResp,
            message: "unknown item",
          },
          { status: 400 }
        );
      }
    });

    const grandtotal = bodyParam.items.reduce(
      (accumulator: any, currentItem: PurchItem) => {
        return accumulator + currentItem.total;
      },
      0
    );

    const updatedReq: PurchaseDocument = bodyParam;
    updatedReq.poNo = await generatePoNumber(bodyParam.supplier);
    updatedReq.number = Number(updatedReq.poNo.split("/")[0]);
    updatedReq.grandTotal = grandtotal;
    updatedReq.status = bodyParam.status == "" ? "draft" : bodyParam.status;

    await startDb();

    const doCreateItem = await Purchase.create(bodyParam);

    return NextResponse.json(
      {
        ...initStandardResp,
        success: true,
        result: doCreateItem,
        message: "Successfully Created item",
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        ...initStandardResp,
        result: err,
      },
      { status: 500 }
    );
  }
};
