import type { BillState } from "./models";
import { billActions } from "./slices";
import { AppDispatch, AppThunk } from "../store";

const { setSearchInput, updateSearchInput } = billActions;

const callSetSearchInput =
  (payload: BillState): AppThunk =>
  (dispatch: AppDispatch) => {
    dispatch(setSearchInput(payload));
  };

const callUpdateDashboard =
  (payload: BillState): AppThunk =>
  (dispatch: AppDispatch) => {
    dispatch(updateSearchInput(payload));
  };

const actions = {
  callSetSearchInput,
  callUpdateDashboard,
};

export default actions;
