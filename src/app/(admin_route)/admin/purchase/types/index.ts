import type { Option } from "@/components/Dropdown/types";
import { TableHeader } from "@/components/Table/types";

import { PurchaseState } from "@/redux/purchase/models";

import { MODE } from "../../supplier/types";

export interface AntdDataType {
  key: React.Key;
  poNo: string;
  status: string;
  company: string;
  date: string;
  expDate: string;
  paymentStatus: string;
  purchPaymentMethod: string;
  note: string;
  subTotal: number;
  taxTotal: number;
  grandTotal: number;
  operation: React.ReactNode;
}

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
