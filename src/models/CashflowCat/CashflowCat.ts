import { Model, model, models } from "mongoose";
import { Schema } from "mongoose";

import { CashflowCatDocument } from "./types";

const cashflowCatSchema = new Schema<CashflowCatDocument>({
  removed: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    enum: ["income", "expense"],
    require: true,
  },
  name: {
    type: String,
    trim: true,
    required: true,
  },
  description: {
    type: String,
    trim: true,
  },
});

const ItemCategory =
  models.CashflowCategory || model("CashflowCategory", cashflowCatSchema);

export default ItemCategory as Model<CashflowCatDocument>;
