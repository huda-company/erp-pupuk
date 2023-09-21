import axios from "axios";

import { base_url } from "@/constants/env";

import { ItemFormAPIReqType } from "@/app/(admin_route)/admin/item/types";
import { StandardResp } from "@/app/api/types";

const ROLE_API = `${base_url}/api/role`;

export const getRoles = async (): Promise<StandardResp> => {
  const { data } = await axios.get(`${ROLE_API}/list`);

  return data;
};

export const getUserById = async (id: string): Promise<StandardResp> => {
  const { data } = await axios.get(`${ROLE_API}/read/${id}`);

  return data;
};

export const addItem = async (
  params: ItemFormAPIReqType
): Promise<StandardResp> => {
  const { data } = await axios.post(`${ROLE_API}`, params);

  return data;
};

export const editItem = async (
  params: ItemFormAPIReqType
): Promise<StandardResp> => {
  const { data } = await axios.patch(
    `${ROLE_API}/update/${params._id}`,
    params
  );

  return data;
};

export const deleteItem = async (id: string): Promise<StandardResp> => {
  const { data } = await axios.delete(`${ROLE_API}/delete/${id}`);

  return data;
};
