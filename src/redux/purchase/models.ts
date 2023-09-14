import type { Option } from "@/components/Dropdown/types";

export type PurchItemType = {
  itemOpt: Option;
  qty: number;
  price: number;
  discount: number;
  itemTotal: number;
};

export type PurchaseState = {
  _id?: string;
  recurring?: boolean;
  billingCode: string;
  year: number;
  expDate: string;
  supplier?: string;
  supplierOpt: Option;
  ppnIncluded?: boolean;
  taxRate?: number;
  taxTotal: number;
  subTotal: number;
  grandTotal: number;
  discount: number;
  purchPaymentMethodOpt: Option;
  purchPaymentMethod?: string;
  note: string;
  status?: string;
  pdfPath?: string;
  items: PurchItemType[];
};
