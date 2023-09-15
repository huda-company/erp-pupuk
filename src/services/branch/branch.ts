import axios from "axios";

import { base_url } from "@/constants/env";

import { BranchFormReqType } from "@/app/(admin_route)/admin/branch/types";
import { StandardResp } from "@/app/api/types";

const BRANCH_API = `${base_url}/api/branch`;

export const getBranches = async (): Promise<StandardResp> => {
  const { data } = await axios.get(`${BRANCH_API}/list`);

  return data;
};


export const getBranchById = async (id: string): Promise<StandardResp> => {
  const { data } = await axios.get(`${BRANCH_API}/read/${id}`);

  return data;
};

export const addBranch = async (
  params: BranchFormReqType
): Promise<StandardResp> => {
  const { data } = await axios.post(`${BRANCH_API}`, params);

  return data;
};


export const editBranch = async (
  params: BranchFormReqType
): Promise<StandardResp> => {
  const { data } = await axios.patch(
    `${BRANCH_API}/update/${params.id}`,
    params
  );

  return data;
};

export const deleteItem = async (id: string): Promise<StandardResp> => {
  const { data } = await axios.delete(`${BRANCH_API}/delete/${id}`);

  return data;
};
