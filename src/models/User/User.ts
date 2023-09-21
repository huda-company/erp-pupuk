import bcrypt from "bcrypt";
import mongoose, { Model, model, models } from "mongoose";
import { Schema } from "mongoose";

import { UserDocument } from "./types";
import Role from "../Role/Role";

interface Methods {
  comparePassword(password: string): Promise<boolean>;
}

const userSchema = new Schema<UserDocument, object, Methods>({
  removed: {
    type: Boolean,
    default: false,
  },
  enabled: {
    type: Boolean,
    default: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: true,
  },
  name: { type: String, required: true, lowercase: true },
  surname: { type: String, required: true, lowercase: true },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Role,
    require: true,
    autopopulate: true,
  },
  photo: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  hasCustomPermissions: {
    type: Boolean,
    default: false,
  },
  isLoggedIn: { type: Number },
  loggedSessions: {
    type: [String],
    default: [],
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const UserModel = models.User || model("User", userSchema);

export default UserModel as Model<UserDocument, object, Methods>;
