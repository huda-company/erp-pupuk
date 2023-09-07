import { combineReducers } from "@reduxjs/toolkit";

import { toastReducers } from "./toast/slices";
import { initialState as initialBillState } from "./bill/data";
import { billReducers } from "./bill/slices";

const appReducer = combineReducers({
  toast: toastReducers,
  bill: billReducers,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === "utils/logout") {
    state.bill = initialBillState;
    return appReducer(state, action);
  }

  return appReducer(state, action);
};

export { rootReducer };
