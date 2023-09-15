import axios from "axios";

import { StandardResp } from "@/app/api/types";

import { PURCHASE_API_URL } from "./config";
import { APIPurchaseReq } from "./types";
import { standardResp } from "../config";

export const getPurchases = async (): Promise<StandardResp> => {
  const { data } = await axios.get(PURCHASE_API_URL.LIST);

  return data;
};

export const getPurchaseById = async (id: string): Promise<StandardResp> => {
  const { data } = await axios.get(`${PURCHASE_API_URL.SHOW}/${id}`);

  return data;
};

export const addPurchase = async (
  params: APIPurchaseReq
): Promise<StandardResp> => {
  const { data } = await axios.post(`${PURCHASE_API_URL.CREATE}`, params);

  return data;
};

export const editPurchase = async (
  params: APIPurchaseReq
): Promise<StandardResp> => {
  let res: StandardResp = standardResp;
  try {
    const { data } = await axios.patch(
      `${PURCHASE_API_URL.UPDATE}/${params._id}`,
      params
    );

    res = data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const response = error.response;
      res = response?.data;
    }
  }

  return res;
};

export const deletePurchase = async (id: string): Promise<StandardResp> => {
  const { data } = await axios.delete(`${PURCHASE_API_URL.DELETE}/${id}`);

  return data;
};
