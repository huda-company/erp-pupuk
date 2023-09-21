import { Model, model, models } from "mongoose";
import { Schema } from "mongoose";

import { RoleDocument } from "./types";

const RoleSchema = new Schema<RoleDocument>({
  removed: {
    type: Boolean,
    default: false,
  },
  codeName: {
    type: String,
    trim: true,
    require: true,
  },
  displayName: {
    type: String,
    trim: true,
    require: true,
  },
  created: {
    type: Date,
    default: Date.now(),
  },
});

const role = models.Role || model("Role", RoleSchema);

export default role as Model<RoleDocument>;
