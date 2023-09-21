import { ColumnsType } from "antd/es/table";

import { base_url } from "@/constants/env";

import {
  emptyOption,
  TableHeaders,
  UserAntdDataType,
  UserFormType,
} from "../types";
import { AdminBcBaseItems } from "../../config";

export const initAddEditItemForm: UserFormType = {
  roleOpt: emptyOption,
  name: "",
  surname: "",
  email: "",
  password: "",
};

export const USERFORM_ERRORS = {
  ROLE_REQUIRED: "Role cannot empty",
  NAME_REQUIRED: "Name cannot empty",
  EMAIL_REQUIRED: "Email cannot empty",
  PASSWORD_REQUIRED: "Password cannot empty",
};

export const tableHeaders: TableHeaders = {
  usrListHeader: [
    {
      value: "Role",
      className: "text-left w-[12rem] pr-0",
    },
    { value: "Name", className: "text-left w-[14rem]" },
    { value: "Email", className: "text-left w-[8rem]" },
    { value: "", className: "text-left w-[10rem]" },
  ],
};

export const FE_USER_URL = {
  LIST: `${base_url}/admin/user`,
  CREATE: `${base_url}/admin/user/add`,
  EDIT: `${base_url}/admin/user/edit`,
  READ: `${base_url}/admin/user/read`,
};

export const itemAntdColumns: ColumnsType<UserAntdDataType> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    sorter: true,
  },
  { title: "Role", dataIndex: "roleName", key: "roleName" },
  {
    title: "Action",
    dataIndex: "operation",
    key: "operation",
    fixed: "right",
    width: 95,
  },
];

export const UserBcBaseItems = [
  ...AdminBcBaseItems,
  {
    title: "User",
    href: null,
  },
];

const UserBcLinkItem = {
  title: "User",
  href: FE_USER_URL.LIST,
};

export const AddItemBcItems = [
  ...AdminBcBaseItems,
  UserBcLinkItem,
  {
    title: "Add User",
    href: null,
  },
];

export const EditItemBcItems = [
  ...AdminBcBaseItems,
  UserBcLinkItem,
  {
    title: "Edit User",
    href: null,
  },
];

export const ReadItemBcItems = [
  ...AdminBcBaseItems,
  UserBcLinkItem,
  {
    title: "Detail User",
    href: null,
  },
];
