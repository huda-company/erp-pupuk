import { Types } from "mongoose";

export type PurchItem = {
  item: Types.ObjectId;
  quantity: number;
  price: number;
  discount: number;
  total: number;
};

export interface PurchaseDocument extends Document {
  items: PurchItem[];
  poNo: string;
  billingCode: string;
  number: number;
  recurring: string;
  year: number;
  date: Date;
  expDate: Date;
  supplier: Types.ObjectId;
  ppnIncluded: boolean;
  subTotal: number;
  taxRate: number;
  taxTotal: number;
  grandTotal: number;
  credit: number;
  discount: number;
  paymentPurchase: Types.ObjectId;
  paymentStatus: string;
  purchPaymentMethod: string;
  note: string;
  status: string;
  pdfPath: string;
  updatedAt: Date;
  createdAt: Date;
  removed: boolean;
}
