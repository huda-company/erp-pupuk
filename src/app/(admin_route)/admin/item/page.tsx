"use client";
import { Button as BtnAntd, Dropdown, Modal, Table as TableAntd } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";

import useMount from "@/hooks/useMount";

import CustomBreadcrumb from "@/components/CustomBreadcrumb";
import HeaderModule from "@/components/Header/HeaderModule";

import { deleteItem, getItems } from "@/services/item/item";
import { APIItemResp } from "@/services/item/types";

import { StandardResp } from "@/app/api/types";

import { FE_ITEM_URL, itemAntdColumns, ItemBcBaseItems } from "./config";
import { ItemAntdDataType } from "./types";

export default function Page() {
  const { confirm } = Modal;
  const router = useRouter();
  const [tblItm, setTblItm] = useState<ItemAntdDataType[]>([]);
  const [itemData, setItemData] = useState<APIItemResp[]>([]);

  const handleCallAPI = async () => {
    const res1: StandardResp = await getItems();
    if (res1.success) {
      const supp: APIItemResp[] = res1.result;
      setItemData(supp);
    }
  };

  useMount(() => {
    handleCallAPI();
  });

  const showDeleteConfirm = useCallback(
    async (id: string) => {
      await confirm({
        title: "Are you sure delete this data?",
        // content: "Some descriptions",
        okText: "Yes",
        okType: "danger",
        cancelText: "No",
        centered: true,
        async onOk() {
          const resDel: StandardResp = await deleteItem(id);
          if (resDel.success) {
            const newItems: StandardResp = await getItems();
            await setItemData(newItems.result);
          }
        },
      });
    },
    [confirm]
  );

  const handleLoadItemData = useCallback(async () => {
    if (Array.isArray(itemData)) {
      const itmTbl: ItemAntdDataType[] =
        itemData.length > 0
          ? itemData.map((x) => {
              const items = [
                {
                  key: "1",
                  onClick: () => {
                    router.push(`${FE_ITEM_URL.READ}/${x._id}`);
                  },
                  label: "Details",
                },
                {
                  key: "2",
                  onClick: () => {
                    router.push(`${FE_ITEM_URL.EDIT}/${x._id}`);
                  },
                  label: "Edit",
                },
                {
                  key: "3",
                  onClick: () => {
                    showDeleteConfirm(x._id);
                  },
                  label: "Delete",
                },
              ];

              const oprtns = (
                <Dropdown
                  className="w-[100px] rounded-lg ml-[1rem]"
                  menu={{ items }}
                  placement="bottomRight"
                  arrow
                >
                  <BtnAntd
                    shape="circle"
                    icon={<BsThreeDots />}
                    type="primary"
                    size="small"
                    style={{ backgroundColor: "#47AB1E" }}
                  ></BtnAntd>
                </Dropdown>
              );

              return {
                key: x._id,
                name: x.name,
                category: x.itemCategory.name,
                description: x.description,
                brand: x.brand,
                packaging: x.packaging,
                operation: oprtns,
              };
            })
          : [];

      setTblItm(itmTbl);
    }
  }, [itemData, router, showDeleteConfirm]);

  useEffect(() => {
    handleLoadItemData();
  }, [handleLoadItemData]);

  return (
    <>
      <div className="p-2 h-screen bg-white">
        {/* title */}
        <div className="flex justify-between p-2 border-2 border-gray-200 rounded-lg dark:border-gray-700">
          <HeaderModule title="Item" />
          <CustomBreadcrumb items={ItemBcBaseItems} />
        </div>
        {/* body */}
        <div className="p-2 border-2 border-gray-200 rounded-lg dark:border-gray-700 mt-2">
          <div className="pb-[0.5rem] flex justify-end pr-[2.5rem]">
            <Link href={`${FE_ITEM_URL.CREATE}`}>
              <BtnAntd style={{ backgroundColor: "#338DFF" }} type="primary">
                +
              </BtnAntd>
            </Link>
          </div>
          <TableAntd
            columns={itemAntdColumns}
            dataSource={tblItm}
            pagination={{ pageSize: 50 }}
            scroll={{ x: 1300 }}
          />
        </div>
      </div>
    </>
  );
}
