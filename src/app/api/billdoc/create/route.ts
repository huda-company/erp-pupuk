import mime from "mime-types";
import moment from "moment";
import { NextResponse } from "next/server";
import { decode } from "node-base64-image";

import BillDoc from "@/models/BillDoc/BillDoc";
import Purchase from "@/models/Purchase/Purchase";

import startDb from "@/lib/db";

import { PURCHASE_FILE_DIR } from "../config";
import { initStandardResp } from "../../types";

export const POST = async (req: Request) => {
  try {
    const bodyParam = await req.json();
    // const file = formData.get("file") as Blob | null;
    // const title = formData.get("title") as string;
    // const filename = formData.get("filename") as string;
    // const description = formData.get("description") as string;
    // const purchase = formData.get("purchase") as string;

    // ObjectId Checking
    // const checkPurchaseObjId = isObjectIdOrHexString(bodyParam.purchase);
    // if (checkPurchaseObjId !== true) {
    //   return NextResponse.json(
    //     {
    //       ...initStandardResp,
    //       message: "po not aa",
    //     },
    //     { status: 400 }
    //   );
    // }

    await startDb();

    const checkPurchase = await Purchase.findOne({
      _id: bodyParam.purchase,
      removed: false,
    });

    if (!checkPurchase) {
      return NextResponse.json(
        {
          ...initStandardResp,
          message: "po not found",
        },
        { status: 400 }
      );
    }

    const currentDateTime = moment();
    const newFileName = currentDateTime.format("YYYYMMDDHHmmssSSS");
    const namefile = `${bodyParam.purchase}_${newFileName}`;

    const mimeType = await mime.lookup(bodyParam.filename).toString();
    console.log("mimeType", mimeType);
    // return
    const extFile = mimeType.split("/")[1];

    if (bodyParam.file) {
      if (mimeType) {
        const base64WithoutPrefix =
          extFile == "pdf"
            ? bodyParam.file.replace(/^data:application\/\w+;base64,/, "")
            : bodyParam.file.replace(/^data:image\/\w+;base64,/, "");
        // Read the file data as a Buffer
        const buffer1 = Buffer.from(base64WithoutPrefix, "base64");
        await decode(buffer1, {
          fname: PURCHASE_FILE_DIR + namefile,
          ext: extFile,
        });

        const bdParam: any = {
          purchase: bodyParam.purchase,
          title: bodyParam.title,
          description: bodyParam.description,
          fileName: `${namefile}.${extFile}`,
        };
        const result = await BillDoc.create(bdParam);

        return NextResponse.json(
          {
            success: true,
            result,
            message: "Success",
          },
          { status: 200 }
        );
      }
    }
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ error: "Server Side Error !" }), {
      status: 500,
    });
  }
};
