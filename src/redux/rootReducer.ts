import { combineReducers } from "@reduxjs/toolkit";

import { initialState as initialPurchaseState } from "./purchase/data";
import { purchaseReducers } from "./purchase/slices";
import { toastReducers } from "./toast/slices";
import { utilsReducers } from "./utils/slices";

const appReducer = combineReducers({
  toast: toastReducers,
  utils: utilsReducers,
  purchase: purchaseReducers,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === "utils/logout") {
    state.purchase = initialPurchaseState;
    return appReducer(state, action);
  }

  return appReducer(state, action);
};

export { rootReducer };
