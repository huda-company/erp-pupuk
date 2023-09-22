import * as Yup from "yup";

import { CASHFLOWFORM_ERRORS } from "../config";

const AddEditCashflowSchema = Yup.object().shape({
  typeOpt: Yup.object().shape({
    id: Yup.string()
      .required(CASHFLOWFORM_ERRORS.TYPE_REQUIRED)
      .notOneOf([""], "ID cannot be an empty string"),
    label: Yup.string()
      .required(CASHFLOWFORM_ERRORS.TYPE_REQUIRED)
      .notOneOf([""], "Label cannot be an empty string"),
  }),

  cashflowCategoryOpt: Yup.object().shape({
    id: Yup.string()
      .required(CASHFLOWFORM_ERRORS.CASHFLOWCATEGORY_REQUIRED)
      .notOneOf([""], "ID cannot be an empty string"),
    label: Yup.string()
      .required(CASHFLOWFORM_ERRORS.CASHFLOWCATEGORY_REQUIRED)
      .notOneOf([""], "Label cannot be an empty string"),
  }),

  date: Yup.date().required(CASHFLOWFORM_ERRORS.DATE_REQUIRED),

  amount: Yup.number()
    .integer()
    .positive()
    .required(CASHFLOWFORM_ERRORS.AMOUNT_NAME_REQUIRED),
});

export default AddEditCashflowSchema;
