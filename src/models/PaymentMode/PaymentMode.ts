import { Model, model, models } from "mongoose";
import { Schema } from "mongoose";

import { PaymentModeDocument } from "./types";

const paymentModeSchema = new Schema<PaymentModeDocument>({
  removed: {
    type: Boolean,
    default: false,
  },
  enabled: {
    type: Boolean,
    default: true,
  },
  isDefault: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  ref: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const item = models.PaymentMode || model("PaymentMode", paymentModeSchema);

export default item as Model<PaymentModeDocument>;
