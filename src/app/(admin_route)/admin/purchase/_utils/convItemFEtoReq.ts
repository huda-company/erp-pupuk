import { PurchItemType } from "@/redux/purchase/models";

const convItemFEtoReq = (data: PurchItemType[]) => {
  return {
    items: data.map((item: PurchItemType) => ({
      item: item.itemOpt.id,
      price: Number(item.price),
      quantity: Number(item.qty),
      total: Number(item.itemTotal),
    })),
  };
};

export default convItemFEtoReq;
