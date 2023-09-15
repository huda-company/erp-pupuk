import { Types } from "mongoose";

export interface BranchDocument extends Document {
  branchID:Types.ObjectId,
  // itemCategory: Types.ObjectId;
  name: string;
  description: string;
  removed: boolean;
  enabled: boolean;
  address:string
  city:string

}
