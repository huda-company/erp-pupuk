import { NextResponse } from "next/server";

import Item from "@/models/Item/Item";

import startDb from "@/lib/db";

import { initStandardResp } from "../types";

export const POST = async (req: Request) => {
  try {
    const bodyParam = await req.json();

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
