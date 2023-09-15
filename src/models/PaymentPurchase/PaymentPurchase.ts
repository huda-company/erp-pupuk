import { Model, model, models } from "mongoose";
import { Schema } from "mongoose";
import mongoose from "mongoose";

import { PaymPurchaseDocument } from "./types";
import Purchase from "../Purchase/Purchase";

const paymPurchaseSchema = new Schema<PaymPurchaseDocument>({
  removed: {
    type: Boolean,
    default: false,
  },
  number: {
    type: Number,
  },
  purchase: {
    type: mongoose.Schema.ObjectId,
    ref: Purchase,
    required: true,
    autopopulate: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  paymentMode: {
    type: mongoose.Schema.ObjectId,
    ref: "PaymentMode",
    autopopulate: true,
  },
  ref: {
    type: String,
  },
  description: {
    type: String,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const item =
  models.PaymentPurchase || model("PaymentPurchase", paymPurchaseSchema);

export default item as Model<PaymPurchaseDocument>;
