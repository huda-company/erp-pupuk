import { Model, model, models } from "mongoose";
import { Schema } from "mongoose";
import mongoose from "mongoose";

import { PurchaseDocument } from "./types";
import Item from "../Item/Item";
import Supplier from "../Supplier/Supplier";

const purchaseSchema = new Schema<PurchaseDocument>({
  poNo: {
    type: String,
    required: true,
  },
  billingCode: {
    type: String,
    default: "",
  },
  soNumber: {
    type: String,
    default: "",
  },
  paymentStatus: {
    type: String,
    default: "unpaid",
  },
  paymentPurchase: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "PaymentPurchase",
    },
  ],
  number: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  recurring: {
    type: String,
    default: "0",
  },
  date: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  expDate: {
    type: Date,
    required: true,
  },
  ppnIncluded: {
    type: Boolean,
    default: false,
  },
  supplier: {
    type: mongoose.Schema.ObjectId,
    ref: Supplier,
    required: true,
    autopopulate: true,
  },
  items: [
    {
      item: {
        type: mongoose.Schema.ObjectId,
        ref: Item,
        required: true,
        autopopulate: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      discount: {
        type: Number,
        required: true,
      },
      total: {
        type: Number,
        required: true,
      },
    },
  ],
  purchPaymentMethod: {
    type: String,
    default: "cash",
  },
  subTotal: {
    type: Number,
    default: 0,
  },
  discount: {
    type: Number,
    default: 0,
  },
  taxRate: {
    type: Number,
    default: 0,
  },
  taxTotal: {
    type: Number,
    default: 0,
  },
  credit: {
    type: Number,
    default: 0,
  },
  grandTotal: {
    type: Number,
    default: 0,
  },
  note: {
    type: String,
  },
  status: {
    type: String,
    default: "draft",
  },
  pdfPath: {
    type: String,
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

const item = models.Purchase || model("Purchase", purchaseSchema);

export default item as Model<PurchaseDocument>;
