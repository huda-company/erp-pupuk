import { PurchItemType } from "@/redux/purchase/models";

const convItemFEtoReq = (data: PurchItemType[]) => {
  return {
    items: data.map((item: PurchItemType) => ({
      item: item.itemOpt.id,
      price: Number(item.price),
      quantity: Number(item.qty),
      total: Number(item.price) * Number(item.qty),
    })),
  };
};

export default convItemFEtoReq;
