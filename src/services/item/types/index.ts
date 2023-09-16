import ItemCategory from "@/models/ItemCategory/ItemCategory";

export type APIItemResp = {
  itemCategory: typeof ItemCategory
  _id: string;
  removed: boolean;
  enabled: boolean;
  name: string;
  description: string;
  price: number;
};
