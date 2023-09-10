import { Types } from "mongoose";

export interface BillDocDocument extends Document {
  purchase: Types.ObjectId;
  fileName: string;
  title: string;
  description: string;
  updatedAt: Date;
  createdAt: Date;
  removed: boolean;
}
