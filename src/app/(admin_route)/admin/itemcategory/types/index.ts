import type { Option } from "@/components/Dropdown/types";
import { TableHeader } from "@/components/Table/types";

import { MODE } from "../../supplier/types";

export const emptyOption: Option = { id: "", label: "" };

export type ItemCatFormType = {
  _id?: string;
  name: string;
  description: string;
};

export type TableHeaders = {
  itmListHeader: TableHeader;
};

export type ItemCatFormProps = {
  mode: keyof typeof MODE;
};

export interface ItemAntdDataType {
  key: React.Key;
  name: string;
  category: string;
  description: string;
  price: number;
  operation: React.ReactNode;
}
