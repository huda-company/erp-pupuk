import { Model, model, models } from "mongoose";
import { Schema } from "mongoose";

import { ItemCategoryDocument } from "./types";

const itemCategorySchema = new Schema<ItemCategoryDocument>({
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
    required: true,
  },
  description: {
    type: String,
    trim: true,
  },
});

const ItemCategory =
  models.ItemCategory || model("ItemCategory", itemCategorySchema);

export default ItemCategory as Model<ItemCategoryDocument>;
