import { emptyOption } from "@/app/(admin_route)/admin/item/types";

import type { PurchaseState, PurchItemType } from "./models";

export const initPurchItem: PurchItemType = {
  itemOpt: emptyOption,
  price: 0,
  qty: 0,
  itemTotal: 0,
};

export const initialState: PurchaseState = {
  supplierOpt: emptyOption,
  purchPaymentMethodOpt: emptyOption,
  discount: 0,
  expDate: Date.now().toString(),
  grandTotal: 0,
  note: "",
  ppnIncluded: false,
  purchPaymentMethod: "cash",
  status: "unpaid",
  subTotal: 0,
  taxRate: 0,
  taxTotal: 0,
  year: new Date().getFullYear(),
  items: [initPurchItem],
};
