import { PurchItemType } from "@/redux/purchase/models";

const convItemFEtoReq = (data: PurchItemType[]) => {
  return {
    items: data.map((item: PurchItemType) => ({
      item: item.itemOpt.id,
      price: Number(item.price),
      quantity: Number(item.qty),
      discount: Number(item.discount),
      total: Number(item.price) * Number(item.qty) - Number(item.discount),
    })),
  };
};

export default convItemFEtoReq;
