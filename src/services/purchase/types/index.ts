import { PurchItem } from "@/models/Purchase/types";

import { ItemFormAPIReqType } from "@/app/(admin_route)/admin/item/types";
import { SupplierFormType } from "@/app/(admin_route)/admin/supplier/types";

export type PurcItemsRes = {
  item: ItemFormAPIReqType;
  quantity: number;
  price: number;
  discount: number;
  total: number;
};

export type PurcDocRes = {
  _id: string;
  fileName: string;
  description: string;
  title: string;
};

export type APIPurchaseReq = {
  recurring?: boolean;
  billingCode: string;
  year: number;
  expDate: string;
  supplier?: string;
  ppnIncluded: boolean;
  taxRate: number;
  taxTotal: number;
  subTotal: number;
  grandTotal: number;
  discount: number;
  purchPaymentMethod: string;
  note: string;
  status?: string;
  pdfPath?: string;
  credit: number;
  paymentStatus: string;
  items: PurchItem[];
};

export type APIPurchaseResp = {
  _id: string;
  billdocs: PurcDocRes[];
  supplier: SupplierFormType;
  items: PurcItemsRes[];
  poNo: string;
  billingCode: string;
  status: string;
  paymentStatus: string;
  purchPaymentMethod: string;
  note: string;
  pdfPath: string;
  year: number;
  number: number;
  taxRate: number;
  taxTotal: number;
  discount: number;
  ppnIncluded: boolean;
  credit: number;
  subTotal: number;
  grandTotal: number;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
  expDate: Date;
  removed: boolean;
  enabled: boolean;
};
