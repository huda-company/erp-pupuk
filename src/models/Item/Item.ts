import { Model, model, models } from "mongoose";
import { Schema } from "mongoose";
import mongoose from "mongoose";

import { ItemDocument } from "./types";
import ItemCategory from "../ItemCategory/ItemCategory";

const itemSchema = new Schema<ItemDocument>({
  itemCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: ItemCategory,
    require: true,
    autopopulate: true,
  },
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
  brand: {
    type: String,
    trim: true,
    require: true,
  },
  packaging: {
    type: String,
    trim: true,
    require: true,
  },
  description: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    trim: true,
    required: true,
  },
});

const item = models.Item || model("Item", itemSchema);

export default item as Model<ItemDocument>;
