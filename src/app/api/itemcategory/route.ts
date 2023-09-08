import startDb from "@/lib/db";
import Item from "@/models/Item/Item";
import { NextResponse } from "next/server";
import { initStandardResp } from "../types";
import { NextApiResponse } from "next";

export const POST = async (req: Request, res: NextApiResponse) => {
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
