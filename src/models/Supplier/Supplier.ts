import { Model, model, models } from "mongoose";
import { Schema } from "mongoose";

import { SupplierDocument } from "./types";

const supplierSchema = new Schema<SupplierDocument>({
  removed: {
    type: Boolean,
    default: false,
  },
  enabled: {
    type: Boolean,
    default: true,
  },
  supplierCode: {
    type: String,
    trim: true,
  },
  company: {
    type: String,
    trim: true,
    required: true,
  },
  managerName: {
    type: String,
    trim: true,
    required: true,
  },
  managerSurname: {
    type: String,
    trim: true,
    required: true,
  },
  bankAccount: {
    type: String,
    trim: true,
  },
  RC: {
    type: String,
    trim: true,
  },
  AI: {
    type: String,
    trim: true,
  },
  NIF: {
    type: String,
    trim: true,
  },
  NIS: {
    type: String,
    trim: true,
  },
  address: {
    type: String,
    trim: true,
  },
  tel: {
    type: String,
    trim: true,
    required: true,
  },
  fax: {
    type: String,
    trim: true,
  },
  cell: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },
  website: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Supplier = models.Supplier || model("Supplier", supplierSchema);

export default Supplier as Model<SupplierDocument>;
