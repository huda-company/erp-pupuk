import { NextResponse } from "next/server";

import Cashflow from "@/models/Cashflow/Cashflow";
import CashflowCat from "@/models/CashflowCat/CashflowCat";

import startDb from "@/lib/db";

import { initStandardResp } from "../types";

export const POST = async (req: Request) => {
  try {
    const bodyParam = await req.json();

    await startDb();

    const result = await CashflowCat.findOne({
      _id: bodyParam.cashflowCategory,
      removed: false,
    }).lean();

    if (!result) {
      return NextResponse.json(
        {
          ...initStandardResp,
          message: "unknown Cashflow category",
        },
        { status: 400 }
      );
    }

    const doCreateItem = await Cashflow.create(bodyParam);

    return NextResponse.json(
      {
        ...initStandardResp,
        success: true,
        result: doCreateItem,
        message: "Successfully Created Cashflow",
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
