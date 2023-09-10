import ItemCategory from "@/models/ItemCategory";

export type APIItemResp = {
  _id: string;
  removed: boolean;
  enabled: boolean;
  itemCategory: typeof ItemCategory;
  name: string;
  description: string;
  price: number;
};
