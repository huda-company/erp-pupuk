import { base_url } from "@/constants/env";

import { Option } from "@/components/Dropdown/types";

import { TableHeaders } from "../types";
import { AdminBcBaseItems } from "../../config";

export const MODULE_NAME = "purchase";

export const ITEMFORM_ERRORS = {
  ITEMCATEGORY_REQUIRED: "Category cannot empty",
  NAME_REQUIRED: "Name cannot empty",
  PRICE_NAME_REQUIRED: "Price Name cannot empty",
};

export const tableHeaders: TableHeaders = {
  itmListHeader: [
    { value: "Po Number", className: "text-left w-[14rem]" },
    {
      value: "Supplier",
      className: "text-left w-[12rem] pr-0",
    },
    { value: "Exp Date", className: "text-left w-[10rem]" },
    { value: "Grand Total", className: "text-left w-[12rem]" },
    { value: "Status", className: "text-left w-[10rem]" },
    { value: "", className: "text-left w-[10rem]" },
  ],
};

export const FE_PURCHASING_URL = {
  LIST: `${base_url}/admin/${MODULE_NAME}`,
  CREATE: `${base_url}/admin/${MODULE_NAME}/add`,
  EDIT: `${base_url}/admin/${MODULE_NAME}/edit`,
  READ: `${base_url}/admin/${MODULE_NAME}/read`,
  READ_GENERATE_PDF: `${base_url}/pdfhtml/report/${MODULE_NAME}`,
};

export const PURCH_PAYM_METH_OPTS: Option[] = [
  {
    id: "cash",
    label: "cash",
  },
  {
    id: "credit",
    label: "credit",
  },
];

export const PurchBcBaseItems = [
  ...AdminBcBaseItems,
  {
    title: "Purchase",
    href: null,
  },
];

const PurchBcLinkItem = {
  title: "Purchase",
  href: FE_PURCHASING_URL.LIST,
};

export const AddPurchBcItems = [
  ...AdminBcBaseItems,
  PurchBcLinkItem,
  {
    title: "Add Purchase Order",
    href: null,
  },
];

export const EditPurchBcItems = [
  ...AdminBcBaseItems,
  PurchBcLinkItem,
  {
    title: "Edit Purchase Order",
    href: null,
  },
];

export const ReadPurchBcItems = [
  ...AdminBcBaseItems,
  PurchBcLinkItem,
  {
    title: "Detail Purchase Order",
    href: null,
  },
];
