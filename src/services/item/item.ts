import { ItemFormAPIReqType } from "@/app/(admin_route)/admin/item/types";
import { StandardResp } from "@/app/api/types";
import { base_url } from "@/constants/env";
import axios from "axios";

const ITEM_API = `${base_url}/api/item`;

export const getItem = async (): Promise<StandardResp> => {
  const { data } = await axios.get(`${ITEM_API}/list`);

  return data;
};

export const getItemById = async (id: string): Promise<StandardResp> => {
  const { data } = await axios.get(`${ITEM_API}/read/${id}`);

  return data;
};

export const addItem = async (
  params: ItemFormAPIReqType
): Promise<StandardResp> => {
  const { data } = await axios.post(`${ITEM_API}`, params);

  return data;
};

export const editItem = async (
  params: ItemFormAPIReqType
): Promise<StandardResp> => {
  const { data } = await axios.patch(`${ITEM_API}/update/${params.id}`, params);

  return data;
};

export const deleteItem = async (id: string): Promise<StandardResp> => {
  const { data } = await axios.delete(`${ITEM_API}/delete/${id}`);

  return data;
};
