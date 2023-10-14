import { Types } from "mongoose";

export interface ItemDocument extends Document {
  itemCategory: Types.ObjectId;
  name: string;
  description: string;
  brand: string;
  packaging: string;
  price: number;
  removed: boolean;
  enabled: boolean;
}
