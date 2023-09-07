import { base_url } from "@/constants/env";
import { SupplierFormType, TableHeaders } from "../types";

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
