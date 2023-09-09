import type { Option } from "@/components/Dropdown/types";
import { TableHeader } from "@/components/Table/types";

import { PurchaseState } from "@/redux/purchase/models";

import { MODE } from "../../supplier/types";
export type TableHeaders = {
  itmListHeader: TableHeader;
};

export type PurchaseFormProps = {
  mode: keyof typeof MODE;
  supplierOpts: Option[];
  itemOpts: Option[];
  updatedFormikVal: PurchaseState;
};

export type PurchItemRowProps = {
  uniqueId: string[];
};

export type PurchaseFormAPIReqType = {
  itemCategory: string;
};
