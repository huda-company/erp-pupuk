import { Model, model, models } from "mongoose";
import { Schema } from "mongoose";
import mongoose from "mongoose";

import { CashflowDocument } from "./types";
import CashflowCat from "../CashflowCat/CashflowCat";
import User from "../User/User";

const cashflowSchema = new Schema<CashflowDocument>({
  cashflowCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: CashflowCat,
    require: true,
    autopopulate: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    require: true,
    autopopulate: true,
  },
  type: {
    type: String,
    enum: ["income", "expense"],
    require: true,
  },
  removed: {
    type: Boolean,
    default: false,
  },
  ref: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  created: {
    type: Date,
    default: Date.now(),
  },
  amount: {
    type: Number,
    default: 0,
    required: true,
  },
});

const item = models.Cashflow || model("Cashflow", cashflowSchema);

export default item as Model<CashflowDocument>;
