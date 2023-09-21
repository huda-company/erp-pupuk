import axios from "axios";

import { base_url } from "@/constants/env";

import { UserFormAPIReqType } from "@/app/(admin_route)/admin/user/types";
import { StandardResp } from "@/app/api/types";

const USER_API = `${base_url}/api/user`;

export const getUsers = async (): Promise<StandardResp> => {
  const { data } = await axios.get(`${USER_API}/list`);

  return data;
};

export const getUserById = async (id: string): Promise<StandardResp> => {
  const { data } = await axios.get(`${USER_API}/read/${id}`);

  return data;
};

export const addUser = async (
  params: UserFormAPIReqType
): Promise<StandardResp> => {
  const { data } = await axios.post(`${USER_API}`, params);

  return data;
};

export const editUser = async (
  params: UserFormAPIReqType
): Promise<StandardResp> => {
  const { data } = await axios.patch(
    `${USER_API}/update/${params._id}`,
    params
  );

  return data;
};

export const deleteUser = async (id: string): Promise<StandardResp> => {
  const { data } = await axios.delete(`${USER_API}/delete/${id}`);

  return data;
};
