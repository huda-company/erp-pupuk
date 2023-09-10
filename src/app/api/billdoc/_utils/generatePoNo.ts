import momentTZ from "moment-timezone";
import "moment-timezone";

import { timezone } from "@/constants/env";

import Purchase from "@/models/Purchase/Purchase";
import Supplier from "@/models/Supplier/Supplier";

import intToRoman from "./intToRoman";

const generatePoNumber = async (suppId: string) => {
  let poNo = "";

  const currentDateInTimezone = momentTZ().tz(String(timezone));
  const monthInRoman = intToRoman(Number(currentDateInTimezone.format("MM")));
  const year = currentDateInTimezone.format("YYYY");

  const supplier = await Supplier.findOne({ _id: suppId, removed: false });

  if (supplier) {
    const searchTerm = `ATM\\/${supplier.supplierCode}\\/${monthInRoman}\\/${year}`;

    const regexTerm = new RegExp(searchTerm);

    const checkTotalRow = await Purchase.countDocuments({
      poNo: { $regex: regexTerm },
    });

    poNo = `${checkTotalRow + 1}/ATM/${
      supplier.supplierCode
    }/${monthInRoman}/${year}`;
  }

  return poNo;
};

export default generatePoNumber;
