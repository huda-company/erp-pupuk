import { NextResponse } from "next/server";

import Branch from "@/models/Branch";

import startDb from "@/lib/db";

import { initStandardResp } from "../types";

export const POST = async (req: Request) => {
  try {
    const bodyParam = await req.json();

   
    // const updatedReq: any = bodyParam;

    await startDb();

    const doCreateBranch = await Branch.create(bodyParam);

    return NextResponse.json(
      {
        ...initStandardResp,
        success: true,
        result: doCreateBranch,
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
