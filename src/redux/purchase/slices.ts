import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { initialState } from "./data";
import type { PurchaseState } from "./models";

const purchaseSlice = createSlice({
  name: "purchase",
  initialState,
  reducers: {
    setSearchInput: (state, { payload }: PayloadAction<PurchaseState>) => {
      state = { ...payload };
    },
    updatePurchaseData: (state, { payload }: PayloadAction<PurchaseState>) => {
      state = payload;
    },
    PURGE: (state) => {
      // eslint-disable-next-line no-unused-vars
      state = initialState;
    },
  },
});

const { actions: purchaseActions, reducer: purchaseReducers } = purchaseSlice;

export { purchaseActions, purchaseReducers };
