import * as Yup from "yup";

import { SUPPLIERFORM_ERRORS } from "../config";

const AddEditSupplierSchema = Yup.object().shape({
  company: Yup.string().required(SUPPLIERFORM_ERRORS.COMPANY_REQUIRED),

  managerName: Yup.string().required(SUPPLIERFORM_ERRORS.MANAGER_NAME_REQUIRED),

  managerSurname: Yup.string().required(
    SUPPLIERFORM_ERRORS.MANAGER_SURNAME_REQUIRED
  ),

  tel: Yup.string().required(SUPPLIERFORM_ERRORS.PHONE_REQUIRED),

  email: Yup.string().required(SUPPLIERFORM_ERRORS.EMAIL_REQUIRED),

  bankAccount: Yup.string().required(SUPPLIERFORM_ERRORS.BANK_ACC_REQUIRED),
});

export default AddEditSupplierSchema;
