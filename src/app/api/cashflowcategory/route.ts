import { NextResponse } from "next/server";

import CashflowCat from "@/models/CashflowCat/CashflowCat";

import startDb from "@/lib/db";

import { initStandardResp } from "../types";

export const POST = async (req: Request) => {
  try {
    const bodyParam = await req.json();

    await startDb();

    const doCreateItem = await CashflowCat.create(bodyParam);

    return NextResponse.json(
      {
        ...initStandardResp,
        success: true,
        result: doCreateItem,
        message: "Successfully Created CashflowCat",
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
