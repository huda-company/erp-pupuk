import { TableHeader } from "@/components/Table/types";

export interface SuppAntdDataType {
  key: React.Key;
  supplierCode: string;
  company: string;
  tel: string;
  email: string;
  address: string;
  operation: React.ReactNode;
}

export enum MODE {
  "ADD",
  "EDIT",
  "READ",
}

export type SupplierFormType = {
  _id?: string;
  company: string;
  managerSurname: string;
  managerName: string;
  tel: string;
  email: string;
  bankAccount: string;
  address: string;
};

export type TableHeaders = {
  emailPasswords: TableHeader;
};

export type SupplierFormProps = {
  mode: keyof typeof MODE;
};
