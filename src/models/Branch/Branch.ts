import { Model, model, models } from "mongoose";
import { Schema } from "mongoose";

import { BranchDocument } from "./types/index";

const branchSchema = new Schema<BranchDocument>({
  removed: {
    type: Boolean,
    default: false,
  },
  enabled: {
    type: Boolean,
    default: true,
  },
  name: {
    type: String,
    trim: true,
    require: true,
  },
  description: {
    type: String,
    trim: true,
  },
  address: {
    type: String,
    trim: true,
    required: true,
  },
  city: {
    type: String,
    trim: true,
    required: true,
  },
});

const branch = models.Branch || model("Branch", branchSchema);

export default branch as Model<BranchDocument>;
