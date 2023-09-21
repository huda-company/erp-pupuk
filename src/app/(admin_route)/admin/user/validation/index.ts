import * as Yup from "yup";

import { USERFORM_ERRORS } from "../config";

export const AddUserSchema = Yup.object().shape({
  roleOpt: Yup.object().shape({
    id: Yup.string()
      .required(USERFORM_ERRORS.ROLE_REQUIRED)
      .notOneOf([""], "ID cannot be an empty string"),
    label: Yup.string()
      .required(USERFORM_ERRORS.ROLE_REQUIRED)
      .notOneOf([""], "Label cannot be an empty string"),
  }),

  name: Yup.string().required(USERFORM_ERRORS.NAME_REQUIRED),

  email: Yup.string().required(USERFORM_ERRORS.EMAIL_REQUIRED),

  password: Yup.string().required(USERFORM_ERRORS.PASSWORD_REQUIRED),
});

export const EditUserSchema = Yup.object().shape({
  roleOpt: Yup.object().shape({
    id: Yup.string()
      .required(USERFORM_ERRORS.ROLE_REQUIRED)
      .notOneOf([""], "ID cannot be an empty string"),
    label: Yup.string()
      .required(USERFORM_ERRORS.ROLE_REQUIRED)
      .notOneOf([""], "Label cannot be an empty string"),
  }),

  name: Yup.string().required(USERFORM_ERRORS.NAME_REQUIRED),

  email: Yup.string().required(USERFORM_ERRORS.EMAIL_REQUIRED),
});
