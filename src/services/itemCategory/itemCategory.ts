import axios from "axios";

import { base_url } from "@/constants/env";

import { SupplierFormType } from "@/app/(admin_route)/admin/supplier/types";
import { StandardResp } from "@/app/api/types";

const ITEMCAT_API = `${base_url}/api/itemcategory`;

export const getItemCategory = async (): Promise<StandardResp> => {
  const { data } = await axios.get(`${ITEMCAT_API}/list`);

  return data;
};

export const getSupplierById = async (id: string): Promise<StandardResp> => {
  const { data } = await axios.get(`${ITEMCAT_API}/read/${id}`);

  return data;
};

export const addSupplier = async (
  params: SupplierFormType
): Promise<StandardResp> => {
  const { data } = await axios.post(`${ITEMCAT_API}`, params);

  return data;
};

export const editSupplier = async (
  params: SupplierFormType
): Promise<StandardResp> => {
  const { data } = await axios.patch(
    `${ITEMCAT_API}/update/${params._id}`,
    params
  );

  return data;
};
