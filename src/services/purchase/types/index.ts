import { PurchItem } from "@/models/Purchase/types";

import { SupplierFormType } from "@/app/(admin_route)/admin/supplier/types";

export type APIPurchaseReq = {
  recurring?: boolean;
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
  status: string;
  pdfPath?: string;
  credit: number;
  paymentStatus: string;
  items: PurchItem[];
};

export type APIPurchaseResp = {
  _id: string;
  supplier: SupplierFormType;
  items: PurchItem[];
  poNo: string;
  billingCode: string;
  status: string;
  paymentStatus: string;
  note: string;
  pdfPath: string;
  year: number;
  number: number;
  taxRate: number;
  taxtotal: number;
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
