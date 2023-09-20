import { base_url } from "@/constants/env";

import { SupplierFormType, TableHeaders } from "../types";
import { AdminBcBaseItems } from "../../config";

export const initAddEditSupplierForm: SupplierFormType = {
  company: "",
  address: "",
  bankAccount: "",
  email: "",
  managerName: "",
  managerSurname: "",
  tel: "",
};

export const SUPPLIERFORM_ERRORS = {
  CHAR_MUST_STRING: "Only alphabet allowed",
  COMPANY_REQUIRED: "Company cannot empty",
  MANAGER_NAME_REQUIRED: "Manager Name cannot empty",
  MANAGER_SURNAME_REQUIRED: "Manager Surname cannot empty",
  BANK_ACC_REQUIRED: "Bank Account cannot empty",
  EMAIL_REQUIRED: "Email cannot empty",
  PHONE_REQUIRED: "Phone cannot empty",
};

export const tableHeaders: TableHeaders = {
  emailPasswords: [
    {
      value: "Code",
      className: "text-left w-[12rem] pr-0",
    },
    { value: "Name", className: "text-left w-[14rem]" },
    { value: "Phone", className: "text-left w-[8rem]" },
    { value: "Email", className: "text-left w-[8rem]" },
    { value: "", className: "text-left w-[10rem]" },
  ],
};

export const FE_SUPPLIER_URL = {
  LIST: `${base_url}/admin/supplier`,
  CREATE: `${base_url}/admin/supplier/add`,
  EDIT: `${base_url}/admin/supplier/edit`,
  READ: `${base_url}/admin/supplier/read`,
};

export const SuppBcBaseItems = [
  ...AdminBcBaseItems,
  {
    title: "Supplier",
    href: null,
  },
];

const SuppBcLinkItem = {
  title: "Supplier",
  href: FE_SUPPLIER_URL.LIST,
};

export const AddSuppBcItems = [
  ...AdminBcBaseItems,
  SuppBcLinkItem,
  {
    title: "Add Supplier",
    href: null,
  },
];

export const EditSuppBcItems = [
  ...AdminBcBaseItems,
  SuppBcLinkItem,
  {
    title: "Edit Supplier",
    href: null,
  },
];

export const ReadSuppBcItems = [
  ...AdminBcBaseItems,
  SuppBcLinkItem,
  {
    title: "Detail Supplier",
    href: null,
  },
];
