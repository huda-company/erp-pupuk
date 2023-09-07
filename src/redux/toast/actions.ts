import type { Toast } from "./models";
import { toastActions } from "./slices";
import { AppDispatch, AppThunk } from "../store";

const { toggleToast, resetToast } = toastActions;

const callShowToast =
  (toast: Toast): AppThunk =>
  (dispatch: AppDispatch) => {
    const timeout = toast.timeout || 1000;

    dispatch(toggleToast({ ...toast, show: true }));

    setTimeout(() => {
      dispatch(toggleToast({ ...toast, show: false }));
    }, timeout);
  };

const callResetToast = (): AppThunk => (dispatch: AppDispatch) => {
  dispatch(resetToast());
};

const actions = {
  callShowToast,
  callResetToast,
};

export default actions;
