import { StandardResp } from "@/app/api/types";
import { base_url } from "@/constants/env";
import axios from "axios";

export const getSuppliers = async (): Promise<StandardResp> => {
  const { data } = await axios.get(`${base_url}/api/supplier/list`);

  return data;
};

export const getSupplierById = async (id: string): Promise<StandardResp> => {
  const { data } = await axios.get(`${base_url}/api/supplier/read/${id}`);

  return data;
};
