import mime from "mime-types";
import moment from "moment";
import { NextResponse } from "next/server";
import { decode } from "node-base64-image";

import BillDoc from "@/models/BillDoc/BillDoc";
import PaymentMode from "@/models/PaymentMode";
import PaymentPurchase from "@/models/PaymentPurchase/PaymentPurchase";
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
    }).lean();

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

        if (result) {
          let newStat = checkPurchase.status;

          if (
            ["invoice", "billing code"].includes(
              String(bodyParam.title).trim().toLowerCase()
            )
          ) {
            newStat = "approved";
          } else if (
            ["file evidence"].includes(
              String(bodyParam.title).trim().toLowerCase()
            )
          ) {
            newStat = "released";
          }

          const updates = {
            status: newStat,
          };

          const purchEdit = await Purchase.findOneAndUpdate(
            { _id: checkPurchase._id, removed: false },
            { $set: updates },
            {
              new: true, // return the new result instead of the old one
            }
          ).lean();

          if (purchEdit) {
            const cash = await PaymentMode.findOne({ name: "cash" }).lean();
            if (cash) {
              const payPurch = {
                purchase: checkPurchase._id,
                amount: Number(checkPurchase.grandTotal),
                paymentMode: cash._id,
              };
              PaymentPurchase.create(payPurch);
            }
          }
        }

        return NextResponse.json(
          {
            success: true,
            result,
            message: "Successfully update po status",
          },
          { status: 200 }
        );
      }
    }
  } catch (err) {
    return new Response(JSON.stringify({ error: "Server Side Error !" }), {
      status: 500,
    });
  }
};
