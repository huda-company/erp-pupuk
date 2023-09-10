import { Model, model, models } from "mongoose";
import { Schema } from "mongoose";
import mongoose from "mongoose";

import { BillDocDocument } from "./types";
import Purchase from "../Purchase/Purchase";

const billDocSchema = new Schema<BillDocDocument>({
  purchase: {
    type: mongoose.Schema.ObjectId,
    ref: Purchase,
    required: true,
    autopopulate: true,
  },
  fileName: {
    type: String,
  },
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
  },
  removed: {
    type: Boolean,
    default: false,
  },
});

const item = models.Billdoc || model("Billdoc", billDocSchema);

export default item as Model<BillDocDocument>;
