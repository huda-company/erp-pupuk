import * as Yup from "yup";
import { ITEMFORM_ERRORS } from "../config";

const AddEditPurchaseSchema = Yup.object().shape({
  itemCategoryOpt: Yup.object().required(ITEMFORM_ERRORS.ITEMCATEGORY_REQUIRED),

  name: Yup.string().required(ITEMFORM_ERRORS.NAME_REQUIRED),

  price: Yup.number()
    .integer()
    .positive()
    .required(ITEMFORM_ERRORS.PRICE_NAME_REQUIRED),
});

export default AddEditPurchaseSchema;
