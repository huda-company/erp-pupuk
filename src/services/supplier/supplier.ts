import axios from "axios";

import { base_url } from "@/constants/env";

import { SupplierFormType } from "@/app/(admin_route)/admin/supplier/types";
import { StandardResp } from "@/app/api/types";

export const SUPPLIER_API = `${base_url}/api/supplier`;

export const getSuppliers = async (): Promise<StandardResp> => {
  const { data } = await axios.get(`${SUPPLIER_API}/list`);

  return data;
};

export const getSupplierById = async (id: string): Promise<StandardResp> => {
  const { data } = await axios.get(`${SUPPLIER_API}/read/${id}`);

  return data;
};

export const addSupplier = async (
  params: SupplierFormType
): Promise<StandardResp> => {
  const { data } = await axios.post(`${SUPPLIER_API}`, params);

  return data;
};

export const editSupplier = async (
  params: SupplierFormType
): Promise<StandardResp> => {
  const { data } = await axios.patch(
    `${SUPPLIER_API}/update/${params._id}`,
    params
  );

  return data;
};

export const deleteSupplier = async (id: string): Promise<StandardResp> => {
  const { data } = await axios.delete(`${SUPPLIER_API}/delete/${id}`);

  return data;
};
