import { TableHeader } from "@/components/Table/types";

export enum MODE {
  "ADD",
  "EDIT",
  "READ",
}

export type SupplierFormType = {
  id?: string;
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
