import type { SidebarState } from "./models";
import { utilsActions } from "./slices";
import { AppDispatch, AppThunk } from "../store";
import { Toast } from "../toast/models";
import { toastActions } from "../toast/slices";

const { logout, setSidebar } = utilsActions;
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

const callSetSidebar =
  (payload: SidebarState): AppThunk =>
  (dispatch: AppDispatch) => {
    dispatch(setSidebar(payload));
  };

const callLogout = (): AppThunk => (dispatch: AppDispatch) => {
  dispatch(logout());
};

const callResetToast = (): AppThunk => (dispatch: AppDispatch) => {
  dispatch(resetToast());
};

const actions = {
  callShowToast,
  callLogout,
  callResetToast,
  callSetSidebar,
};

export default actions;
