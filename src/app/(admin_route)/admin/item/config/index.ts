import { ColumnsType } from "antd/es/table";

import { base_url } from "@/constants/env";

import {
  emptyOption,
  ItemAntdDataType,
  ItemFormType,
  TableHeaders,
} from "../types";

export const initAddEditItemForm: ItemFormType = {
  itemCategoryOpt: emptyOption,
  name: "",
  price: "0",
  description: "",
};

export const ITEMFORM_ERRORS = {
  ITEMCATEGORY_REQUIRED: "Category cannot empty",
  NAME_REQUIRED: "Name cannot empty",
  PRICE_NAME_REQUIRED: "Price Name cannot empty",
};

export const tableHeaders: TableHeaders = {
  itmListHeader: [
    {
      value: "Category",
      className: "text-left w-[12rem] pr-0",
    },
    { value: "Name", className: "text-left w-[14rem]" },
    { value: "Price", className: "text-left w-[8rem]" },
    { value: "Description", className: "text-left w-[8rem]" },
    { value: "", className: "text-left w-[10rem]" },
  ],
};

export const FE_ITEM_URL = {
  LIST: `${base_url}/admin/item`,
  CREATE: `${base_url}/admin/item/add`,
  EDIT: `${base_url}/admin/item/edit`,
  READ: `${base_url}/admin/item/read`,
};

export const itemAntdColumns: ColumnsType<ItemAntdDataType> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
    sorter: true,
  },
  { title: "Price", dataIndex: "price", key: "price" },
  { title: "Description", dataIndex: "description", key: "description" },
  {
    title: "Action",
    dataIndex: "operation",
    key: "operation",
    fixed: "right",
    width: 95,
  },
];
