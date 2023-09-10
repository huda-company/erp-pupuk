import { NextResponse } from "next/server";

import Item from "@/models/Item/Item";
import ItemCategory from "@/models/ItemCategory/ItemCategory";

import startDb from "@/lib/db";

import { initStandardResp } from "../types";

export const POST = async (req: Request) => {
  try {
    const bodyParam = await req.json();

    const result = await ItemCategory.findOne({
      _id: bodyParam.itemCategory,
      removed: false,
    }).lean();

    if (!result) {
      return NextResponse.json(
        {
          ...initStandardResp,
          message: "unknown item category",
        },
        { status: 400 }
      );
    }

    // const updatedReq: any = bodyParam;

    await startDb();

    const doCreateItem = await Item.create(bodyParam);

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
