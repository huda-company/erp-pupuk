import { NextResponse } from "next/server";

import { firstLetterWord, formatNumberToNDigits } from "@/utils/helpers";

import SupplierModel from "@/models/Supplier/Supplier";

import startDb from "@/lib/db";

import { initStandardResp } from "../types";

export const POST = async (req: Request) => {
  try {
    const bodyParam = await req.json();

    let suppCode = (await firstLetterWord(bodyParam.company)).trim();

    const checkCompCode = await SupplierModel.find({ supplierCode: suppCode });
    if (checkCompCode.length > 0) {
      suppCode = `${suppCode}${formatNumberToNDigits(checkCompCode.length, 2)}`;
    }

    const updatedReq: any = bodyParam;
    updatedReq.supplierCode = suppCode;

    await startDb();

    const doCreateSupplier = await SupplierModel.create(bodyParam);

    return NextResponse.json(
      {
        ...initStandardResp,
        success: true,
        result: doCreateSupplier,
        message: "Successfully Created supplier",
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
