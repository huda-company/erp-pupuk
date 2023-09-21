import { NextResponse } from "next/server";

import User from "@/models/User/User";

import startDb from "@/lib/db";

export const GET = async (req: Request) => {
  const idVal = req.url.split("/user/read/")[1];

  if (idVal) {
    try {
      await startDb();

      // Find document by id and updates with the required fields
      const result = await User.findOne({
        _id: idVal,
        removed: false,
      });

      return NextResponse.json(
        {
          success: true,
          result,
          message: "Successfully retrieved user",
        },
        { status: 200 }
      );
    } catch (err) {
      return NextResponse.json(
        {
          success: false,
          result: [],
          message: "Error read user",
          error: err,
        },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json(
      {
        success: false,
        result: [],
        message: "id not found",
      },
      { status: 500 }
    );
  }
};
