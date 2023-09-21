import { NextResponse } from "next/server";

import Role from "@/models/Role";
import User from "@/models/User/User";

import startDb from "@/lib/db";

import { initStandardResp } from "../types";

export const POST = async (req: Request) => {
  try {
    const bodyParam = await req.json();

    await startDb();

    const result = await Role.findOne({
      _id: bodyParam.role,
      removed: false,
    }).lean();

    if (!result) {
      return NextResponse.json(
        {
          ...initStandardResp,
          message: "unknown role",
        },
        { status: 400 }
      );
    }

    const doCreateItem = await User.create(bodyParam);

    return NextResponse.json(
      {
        ...initStandardResp,
        success: true,
        result: doCreateItem,
        message: "Successfully Created user",
      },
      { status: 200 }
    );
  } catch (err) {
    console.log("ccc", err);
    return NextResponse.json(
      {
        ...initStandardResp,
        result: err,
      },
      { status: 500 }
    );
  }
};
