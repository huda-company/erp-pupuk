import { ColumnsType } from "antd/es/table";

import { base_url } from "@/constants/env";

import { CashflowAntdDataType, CashflowFormType, emptyOption } from "../types";
import { AdminBcBaseItems } from "../../config";

export const CASHFLOW_TYPES = [
  { id: "expense", label: "expense" },
  { id: "income", label: "income" },
];

export const initAddEditItemForm: CashflowFormType = {
  cashflowCategoryOpt: emptyOption,
  typeOpt: emptyOption,
  type: "",
  date: "",
  amount: 0,
  description: "",
  createdBy: "",
};

export const CASHFLOWFORM_ERRORS = {
  TYPE_REQUIRED: "Type cannot empty",
  CASHFLOWCATEGORY_REQUIRED: "Category cannot empty",
  DATE_REQUIRED: "Name cannot empty",
  AMOUNT_NAME_REQUIRED: "Amount cannot empty",
};

export const FE_CASHFLOW_URL = {
  LIST: `${base_url}/admin/cashflow`,
  CREATE: `${base_url}/admin/cashflow/add`,
  EDIT: `${base_url}/admin/cashflow/edit`,
  READ: `${base_url}/admin/cashflow/read`,
};

export const itemAntdColumns: ColumnsType<CashflowAntdDataType> = [
  { title: "Date", dataIndex: "created", key: "created" },
  {
    title: "Category",
    dataIndex: "cashflowCategory",
    key: "cashflowCategory",
    sorter: true,
  },
  { title: "Amount", dataIndex: "amount", key: "amount" },
  {
    title: "Action",
    dataIndex: "operation",
    key: "operation",
    fixed: "right",
    width: 95,
  },
];

export const ItemBcBaseItems = [
  ...AdminBcBaseItems,
  {
    title: "Cashflow",
    href: null,
  },
];

const ItemBcLinkItem = {
  title: "Cashflow",
  href: FE_CASHFLOW_URL.LIST,
};

export const AddItemBcItems = [
  ...AdminBcBaseItems,
  ItemBcLinkItem,
  {
    title: "Add Cashflow",
    href: null,
  },
];

export const EditItemBcItems = [
  ...AdminBcBaseItems,
  ItemBcLinkItem,
  {
    title: "Edit Cashflow",
    href: null,
  },
];

export const ReadItemBcItems = [
  ...AdminBcBaseItems,
  ItemBcLinkItem,
  {
    title: "Detail Item",
    href: null,
  },
];
