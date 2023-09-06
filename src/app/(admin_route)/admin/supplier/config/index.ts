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
  BANK_ACC_REQUIRED: "Bank Account cannot empty",
  EMAIL_REQUIRED: "Email cannot empty",
  PHONE_REQUIRED: "Phone cannot empty",
};

export const tableHeaders: TableHeaders = {
  emailPasswords: [
    {
      value: "Code",
      className: "text-left w-[17.5rem] pr-0",
    },
    { value: "Name", className: "text-left w-[20rem]" },
    { value: "Phone", className: "text-left w-[8rem]" },
    { value: "", className: "text-left w-[10rem]" },
  ],
};
