import { base_url } from "@/constants/env";

import { emptyOption, ItemFormType, TableHeaders } from "../types";

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
  branchListHeader: [
    // {
    //   value: "Branch Name",
    //   className: "text-left w-[12rem] pr-0",
    // },
    { value: "Branch Name", className: "text-left w-[14rem]" },
    { value: "Branch Address", className: "text-left w-[14rem]" },
    { value: "Branch City", className: "text-left w-[14rem]" },
    { value: "Description", className: "text-left w-[14rem]" },
  ],
};

export const FE_ITEM_URL = {
  LIST: `${base_url}/admin/item`,
  CREATE: `${base_url}/admin/item/add`,
  EDIT: `${base_url}/admin/item/edit`,
  READ: `${base_url}/admin/item/read`,
};
