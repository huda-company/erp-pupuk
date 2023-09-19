/* eslint-disable unused-imports/no-unused-vars */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { initialState } from "./data";
import type { Toast } from "./models";

const utilsSlice = createSlice({
  name: "utils",
  initialState,
  reducers: {
    toggleToast: (state, { payload }: PayloadAction<Toast>) => {
      state.obj = { ...payload };
    },
    resetToast: (state) => {
      state = initialState;
    },
    PURGE: (state) => {
      state = initialState;
    },
  },
});

const { actions: toastActions, reducer: toastReducers } = utilsSlice;

export { toastActions, toastReducers };
