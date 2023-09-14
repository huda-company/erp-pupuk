import { Types } from "mongoose";

export interface PaymPurchaseDocument extends Document {
  purchase: Types.ObjectId;
  poNo: string;
  billingCode: string;
  number: number;
  recurring: string;
  amount: number;
  paymentMode: Types.ObjectId;
  date: Date;
  ref: string;
  description: string;
  updatedAt: Date;
  createdAt: Date;
  removed: boolean;
}
