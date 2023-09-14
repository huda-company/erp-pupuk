import mime from "mime-types";
import moment from "moment";
import { isObjectIdOrHexString } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { decode } from "node-base64-image";

import BillDoc from "@/models/BillDoc/BillDoc";
import PaymentMode from "@/models/PaymentMode/PaymentMode";
import PaymentPurchase from "@/models/PaymentPurchase/PaymentPurchase";
import Purchase from "@/models/Purchase/Purchase";

import startDb from "@/lib/db";

import { PURCHASE_FILE_DIR } from "./config";
import { initStandardResp } from "../types";

export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as Blob | null;
    const title = formData.get("title") as string;
    const filename = formData.get("filename") as string;
    const description = formData.get("description") as string;
    const purchase = formData.get("purchase") as string;

    // ObjectId Checking
    const checkPurchaseObjId = isObjectIdOrHexString(purchase);
    if (checkPurchaseObjId !== true) {
      return NextResponse.json(
        {
          ...initStandardResp,
          message: "po not aa",
        },
        { status: 400 }
      );
    }

    await startDb();

    const checkPurchase = await Purchase.findOne({
      _id: purchase,
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
    const namefile = `${purchase}_${newFileName}`;

    const mimeType = await mime.lookup(filename).toString();
    const extFile = mimeType.split("/")[1];

    if (file) {
      if (mimeType) {
        const base64WithoutPrefix =
          extFile == "pdf"
            ? file.toString().replace(/^data:application\/\w+;base64,/, "")
            : file.toString().replace(/^data:image\/\w+;base64,/, "");
        // Read the file data as a Buffer
        const buffer1 = Buffer.from(base64WithoutPrefix, "base64");
        await decode(buffer1, {
          fname: PURCHASE_FILE_DIR + namefile,
          ext: extFile,
        });

        const bdParam: any = {
          purchase: purchase,
          title: title,
          description: description,
          fileName: `${namefile}.${extFile}`,
        };
        const result = await BillDoc.create(bdParam);

        if (result) {
          let newStat = checkPurchase.status;

          if (
            ["invoice", "billing code"].includes(
              String(title).trim().toLowerCase()
            )
          ) {
            newStat = "approved";
          } else if (
            ["file evidence"].includes(String(title).trim().toLowerCase())
          ) {
            newStat = "released";
          }

          // doing update po status
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

          // insert to paym purchase
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
