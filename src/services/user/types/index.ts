import { APIRoleResp } from "@/services/role/types";

export type APIUserResp = {
  role: APIRoleResp;
  roleName: string;
  _id: string;
  removed: boolean;
  email: string;
  name: string;
  surname: string;
};
