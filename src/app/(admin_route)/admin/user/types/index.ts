import type { Option } from "@/components/Dropdown/types";
import { TableHeader } from "@/components/Table/types";

import { APIRoleResp } from "@/services/role/types";

import { MODE } from "../../supplier/types";

export const emptyOption: Option = { id: "", label: "" };

export type BaseUserForm = {
  _id?: string;
  name: string;
  surname?: string;
  email: string;
  password?: string;
};

export type UserFormType = {
  roleOpt: Option;
} & BaseUserForm;

export type UserFormAPIReqType = {
  role: string;
} & BaseUserForm;

export type TableHeaders = {
  usrListHeader: TableHeader;
};

export type UserFormProps = {
  mode: keyof typeof MODE;
  roleOpts: Option[];
};

export interface UserAntdDataType {
  key: React.Key;
  name: string;
  email: string;
  role: APIRoleResp;
  roleName: string;
  operation: React.ReactNode;
}
