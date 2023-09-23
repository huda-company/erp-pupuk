import { ColumnsType } from "antd/es/table";

import { base_url } from "@/constants/env";

import { BranchAntdDataType, BranchFormReqType, TableHeaders } from "../types";
import { AdminBcBaseItems } from "../../config";

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

export const branchAntdColumns: ColumnsType<BranchAntdDataType> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
    sorter: true,
  },
  { title: "City", dataIndex: "city", key: "city" },
  { title: "Description", dataIndex: "description", key: "description" },
  {
    title: "Action",
    dataIndex: "operation",
    key: "operation",
    fixed: "right",
    width: 95,
  },
];

export const BranchBcBaseItems = [
  ...AdminBcBaseItems,
  {
    title: "Branch",
    href: null,
  },
];

const BranchBcLinkItem = {
  title: "Branch",
  href: FE_BRANCH_URL.LIST,
};

export const AddItemBcItems = [
  ...AdminBcBaseItems,
  BranchBcLinkItem,
  {
    title: "Add Branch",
    href: null,
  },
];

export const EditItemBcItems = [
  ...AdminBcBaseItems,
  BranchBcLinkItem,
  {
    title: "Edit Branch",
    href: null,
  },
];

export const ReadItemBcItems = [
  ...AdminBcBaseItems,
  BranchBcLinkItem,
  {
    title: "Detail Branch",
    href: null,
  },
];