import * as Yup from "yup";

import { BRANCHFORM_ERRORS } from "../config";


const AddEditBranchSchema = Yup.object().shape({
  name: Yup.string().required(BRANCHFORM_ERRORS.BRANCHNAME_REQUIRED),

  address: Yup.string().required(BRANCHFORM_ERRORS.BRANCHADDRESS_REQUIRED),

  city: Yup.string().required(BRANCHFORM_ERRORS.BRANCHCITY_REQUIRED),

});

export default AddEditBranchSchema;
