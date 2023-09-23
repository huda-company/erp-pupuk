import type { Option } from "@/components/Dropdown/types";
import { TableHeader } from "@/components/Table/types";

export const emptyOption: Option = { id: "", label: "" };

export type BranchFormReqType = {
  id?: string;
  name: string;
  city: string;
  address: string;
  description: string;
};

export type TableHeaders = {
  branchListHeader: TableHeader;
};

export enum MODE {
  "ADD",
  "EDIT",
  "READ",
}

export type BranchFormProps = {
  mode: keyof typeof MODE;
};

export interface BranchAntdDataType {
  key: React.Key;
  name: string;
  address: string;
  description: string;
  city: string;
  operation: React.ReactNode;
}
