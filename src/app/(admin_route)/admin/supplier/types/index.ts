import { TableHeader } from "@/components/Table/types";

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
