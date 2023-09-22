import ItemCategory from "@/models/ItemCategory/ItemCategory";

import { CashflowCategory } from "@/services/cashflowCategory/types";
import { APIUserResp } from "@/services/user/types";

export type APICashflowResp = {
  itemCategory: typeof ItemCategory;
  _id: string;
  removed: boolean;
  type: string;
  date: string;
  cashflowCategory: CashflowCategory;
  createdBy: APIUserResp;
  description: string;
  created: string;
  amount: number;
};
