import startDb from "@/lib/db";
import SupplierModel from "@/models/Supplier/SupplierModel";
import { NextResponse } from "next/server";
import { StandardResp, initStandardResp } from "../types";
import { NextApiRequest, NextApiResponse } from "next";
import { useSearchParams } from "next/navigation";
import parseQueryParameters from "@/utils/parseQueryParameters";

export const POST = async (req: Request, res: NextApiResponse) => {
  try {
    const bodyParam = await req.json();

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
