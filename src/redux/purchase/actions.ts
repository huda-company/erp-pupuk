import type { PurchaseState } from "./models";
import { purchaseActions } from "./slices";
import { AppDispatch, AppThunk } from "../store";

const { updatePurchaseData } = purchaseActions;

const callUpdateDashboard =
  (payload: PurchaseState): AppThunk =>
  (dispatch: AppDispatch) => {
    dispatch(updatePurchaseData(payload));
  };

const actions = {
  callUpdateDashboard,
};

export default actions;
