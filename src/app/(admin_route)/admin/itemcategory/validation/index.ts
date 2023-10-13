import * as Yup from "yup";

import { ITEMFORM_ERRORS } from "../config";

const AddEditItemSchema = Yup.object().shape({
  name: Yup.string().required(ITEMFORM_ERRORS.NAME_REQUIRED),
});

export default AddEditItemSchema;
