import axios from "axios";

import { base_url } from "@/constants/env";

import { ItemCatFormType } from "@/app/(admin_route)/admin/itemcategory/types";
import { StandardResp } from "@/app/api/types";

const ITEMCAT_API = `${base_url}/api/itemcategory`;

export const getItemCategory = async (): Promise<StandardResp> => {
  const { data } = await axios.get(`${ITEMCAT_API}/list`);

  return data;
};

export const getItemCategoryById = async (
  id: string
): Promise<StandardResp> => {
  const { data } = await axios.get(`${ITEMCAT_API}/read/${id}`);

  return data;
};

export const addItemCategory = async (
  params: ItemCatFormType
): Promise<StandardResp> => {
  const { data } = await axios.post(`${ITEMCAT_API}`, params);

  return data;
};

export const editItemCategory = async (
  params: ItemCatFormType
): Promise<StandardResp> => {
  const { data } = await axios.patch(
    `${ITEMCAT_API}/update/${params._id}`,
    params
  );

  return data;
};

export const deleteItemCategory = async (id: string): Promise<StandardResp> => {
  const { data } = await axios.delete(`${ITEMCAT_API}/delete/${id}`);

  return data;
};
