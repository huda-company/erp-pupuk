import { ColumnsType } from "antd/es/table";

import { base_url } from "@/constants/env";

import { ItemAntdDataType, ItemCatFormType, TableHeaders } from "../types";
import { AdminBcBaseItems } from "../../config";

export const initAddEditItemCatForm: ItemCatFormType = {
  name: "",
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

export const FE_ITEM_CAT_URL = {
  LIST: `${base_url}/admin/itemcategory`,
  CREATE: `${base_url}/admin/itemcategory/add`,
  EDIT: `${base_url}/admin/itemcategory/edit`,
  READ: `${base_url}/admin/itemcategory/read`,
};

export const itemCatAntdColumns: ColumnsType<ItemAntdDataType> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  { title: "Description", dataIndex: "description", key: "description" },
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
    title: "Item",
    href: null,
  },
];

const ItemBcLinkItem = {
  title: "Item",
  href: FE_ITEM_CAT_URL.LIST,
};

export const AddItemBcItems = [
  ...AdminBcBaseItems,
  ItemBcLinkItem,
  {
    title: "Add Item",
    href: null,
  },
];

export const EditItemBcItems = [
  ...AdminBcBaseItems,
  ItemBcLinkItem,
  {
    title: "Edit Item",
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
