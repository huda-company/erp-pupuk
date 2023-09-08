import { TableHeader } from "@/components/Table/types";
import type { Option } from "@/components/Dropdown/types";
import { MODE } from "../../supplier/types";

export const emptyOption: Option = { id: "", label: "" };

export type BaseItemForm = {
  id?: string;
  name: string;
  price: string;
  description: string;
};

export type ItemFormType = {
  itemCategoryOpt: Option;
} & BaseItemForm;

export type ItemFormAPIReqType = {
  itemCategory: string;
} & BaseItemForm;

export type TableHeaders = {
  itmListHeader: TableHeader;
};

export type ItemFormProps = {
  mode: keyof typeof MODE;
  itemCatOpts: Option[];
};
