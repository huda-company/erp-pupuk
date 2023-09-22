import type { Option } from "@/components/Dropdown/types";
import { TableHeader } from "@/components/Table/types";

import { MODE } from "../../supplier/types";

export const emptyOption: Option = { id: "", label: "" };

export type BaseCashflowForm = {
  _id?: string;
  createdBy?: string;
  type: string;
  date: string;
  amount: number;
  description: string;
};

export type CashflowFormType = {
  cashflowCategoryOpt: Option;
  typeOpt: Option;
} & BaseCashflowForm;

export type CashflowFormAPIReqType = {
  cashflowCategory: string;
} & BaseCashflowForm;

export type TableHeaders = {
  itmListHeader: TableHeader;
};

export type CashflowFormProps = {
  mode: keyof typeof MODE;
  cashflowCatOpts: Option[];
};

export interface CashflowAntdDataType {
  key: React.Key;
  date: string;
  created: string;
  type: string;
  cashflowCategory: string;
  description: string;
  amount: number;
  creatorName: string;
  operation: React.ReactNode;
}
