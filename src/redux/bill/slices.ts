import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { initialState } from "./data";
import type { BillState } from "./models";

const billSlice = createSlice({
  name: "bill",
  initialState,
  reducers: {
    setSearchInput: (state, { payload }: PayloadAction<BillState>) => {
      state = { ...payload };
    },
    updateSearchInput: (state, { payload }: PayloadAction<BillState>) => {
      const { value } = payload;

      state.value = value;
    },
    PURGE: (state) => {
      state = initialState;
    },
  },
});

const { actions: billActions, reducer: billReducers } = billSlice;

export { billActions, billReducers };
