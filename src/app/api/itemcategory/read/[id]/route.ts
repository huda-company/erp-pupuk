import startDb from "@/lib/db";
import SupplierModel from "@/models/Supplier";
import { NextApiResponse } from "next";
import { NextResponse } from "next/server";

export const GET = async (req: Request, res: NextApiResponse) => {
  const idVal = req.url.split("/supplier/read/")[1];

  if (idVal) {
    try {
      await startDb();

      // Find document by id and updates with the required fields
      const result = await SupplierModel.findOne({
        _id: idVal,
        removed: false,
      });

      return NextResponse.json(
        {
          success: true,
          result,
          message: "Successfully retrieved",
        },
        { status: 200 }
      );
    } catch (err) {
      return NextResponse.json(
        {
          success: false,
          result: [],
          message: "Error read supplier",
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
