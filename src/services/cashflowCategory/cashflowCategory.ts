import axios from "axios";

import { base_url } from "@/constants/env";

import { SupplierFormType } from "@/app/(admin_route)/admin/supplier/types";
import { StandardResp } from "@/app/api/types";

const CASHFLOWCAT_API = `${base_url}/api/cashflowcategory`;

export const getCashflowCategory = async (): Promise<StandardResp> => {
  const { data } = await axios.get(`${CASHFLOWCAT_API}/list`);

  return data;
};

export const getSupplierById = async (id: string): Promise<StandardResp> => {
  const { data } = await axios.get(`${CASHFLOWCAT_API}/read/${id}`);

  return data;
};

export const addSupplier = async (
  params: SupplierFormType
): Promise<StandardResp> => {
  const { data } = await axios.post(`${CASHFLOWCAT_API}`, params);

  return data;
};

export const editSupplier = async (
  params: SupplierFormType
): Promise<StandardResp> => {
  const { data } = await axios.patch(
    `${CASHFLOWCAT_API}/update/${params._id}`,
    params
  );

  return data;
};
