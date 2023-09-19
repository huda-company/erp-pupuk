import { base_url } from "@/constants/env";

import { BranchFormReqType, TableHeaders } from "../types";

export const initAddEditBranchForm: BranchFormReqType = {
  name: "",
  address: "",
  city: "",
  description: "",
};

export const BRANCHFORM_ERRORS = {
  BRANCHNAME_REQUIRED: "Name cannot empty",
  BRANCHADDRESS_REQUIRED: "Address cannot empty",
  BRANCHCITY_REQUIRED: "City cannot empty",
  BRANCHDESCRIPTION_REQUIRED: "Description cannot empty",
};

export const tableHeaders: TableHeaders = {
  branchListHeader: [
    { value: "Branch Name", className: "text-left w-[14rem]" },
    { value: "Branch Address", className: "text-left w-[14rem]" },
    { value: "Branch City", className: "text-left w-[14rem]" },
    { value: "Description", className: "text-left w-[14rem]" },
  ],
};

export const FE_BRANCH_URL = {
  LIST: `${base_url}/admin/branch`,
  CREATE: `${base_url}/admin/branch/add`,
  EDIT: `${base_url}/admin/branch/edit`,
  READ: `${base_url}/admin/branch/read`,
};
