import { initialState } from "./data";
import { RootState } from "../store";

const purchaseRdx = (state: RootState) => state.purchase || initialState;

const selectors = {
  purchaseRdx,
};

export default selectors;
