import startDb from "@/lib/db";
import SupplierModel from "@/models/Supplier";
import parseQueryParameters from "@/utils/parseQueryParameters";
import { NextApiRequest, NextApiResponse } from "next";
import { useSearchParams } from "next/navigation";
import { NextResponse } from "next/server";

export const GET = async (req: Request, res: NextApiResponse) => {
  const {
    page: pageVal,
    items: itemsVal, // show n items
  } = parseQueryParameters(req.url);

  const page = pageVal || 1;
  const limit = itemsVal || 10;
  const skip = Number(page) * limit - limit;

  try {
    await startDb();
    //  Query the database for a list of all results
    const resultsPromise = await SupplierModel.find({ removed: false })
      .skip(skip)
      .limit(limit)
      .sort({ created: "desc" })
      .lean();

    // Counting the total documents
    const countPromise = SupplierModel.count({ removed: false });
    // Resolving both promises
    const [result, count] = await Promise.all([resultsPromise, countPromise]);
    // Calculating total pages
    const pages = Math.ceil(count / limit);

    // Getting Pagination Object
    const pagination = { page, pages, count };
    if (count > 0) {
      return NextResponse.json(
        {
          success: true,
          result,
          pagination,
          message: "Success",
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          result: [],
          pagination,
          message: "Collection is Empty",
        },
        { status: 203 }
      );
    }
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        result: [],
        message: "Oops there is an Error",
        error: err,
      },
      { status: 500 }
    );
  }
};
