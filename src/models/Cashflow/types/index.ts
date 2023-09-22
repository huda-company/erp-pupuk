import { Types } from "mongoose";

export interface CashflowDocument extends Document {
  cashflowCategory: Types.ObjectId;
  type: string;
  ref: string;
  amount: number;
  description: string;
  removed: boolean;
  date: Date;
  created: Date;
  createdBy: Types.ObjectId;
}
