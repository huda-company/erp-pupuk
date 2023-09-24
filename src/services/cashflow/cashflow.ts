import axios from "axios";

import { base_url } from "@/constants/env";

import { QueryParams } from "@/services/_types";

import { CashflowFormAPIReqType } from "@/app/(admin_route)/admin/cashflow/types";
import { StandardResp } from "@/app/api/types";

const CASHFLOW_API = `${base_url}/api/cashflow`;

export const getCashflowData = async (): Promise<StandardResp> => {
  const { data } = await axios.get(`${CASHFLOW_API}/list`);

  return data;
};

export const searchCashflowData = async (
  param: QueryParams
): Promise<StandardResp> => {
  const { data } = await axios.get(
    `${CASHFLOW_API}/search?q=${param.q ?? ""}&fields=${
      param.fields ?? ""
    }&sd=${param.sd}&ed=${param.ed}`
  );

  return data;
};

export const getCashflowById = async (id: string): Promise<StandardResp> => {
  const { data } = await axios.get(`${CASHFLOW_API}/read/${id}`);

  return data;
};

export const addCashflowTrx = async (
  params: CashflowFormAPIReqType
): Promise<StandardResp> => {
  const { data } = await axios.post(`${CASHFLOW_API}`, params);

  return data;
};

export const editCashflowTrx = async (
  params: CashflowFormAPIReqType
): Promise<StandardResp> => {
  const { data } = await axios.patch(
    `${CASHFLOW_API}/update/${params._id}`,
    params
  );

  return data;
};

export const deleteItem = async (id: string): Promise<StandardResp> => {
  const { data } = await axios.delete(`${CASHFLOW_API}/delete/${id}`);

  return data;
};
