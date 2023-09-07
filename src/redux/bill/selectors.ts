import { initialState } from "./data";
import { RootState } from "../store";

const searchInput = (state: RootState) =>
  state.bill.value || initialState.value;

const selectors = {
  searchInput,
};

export default selectors;
