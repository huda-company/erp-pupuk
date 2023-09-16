"use client";
import { Button as BtnAntd, Dropdown, Modal, Table as TableAntd } from "antd";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";

import useMount from "@/hooks/useMount";

import HeaderModule from "@/components/Header/HeaderModule";

import { deleteItem, getItems } from "@/services/item/item";
import { APIItemResp } from "@/services/item/types";

import { StandardResp } from "@/app/api/types";

import { FE_ITEM_URL, itemAntdColumns } from "./config";
import { ItemAntdDataType } from "./types";

export default function Page() {
  const { confirm } = Modal;
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
      const itmTbl: ItemAntdDataType[] = itemData.map((x) => {
        const items = [
          {
            key: "1",
            label: (
              <a
                rel="noopener noreferrer"
                href={`${FE_ITEM_URL.READ}/${x._id}`}
              >
                Details
              </a>
            ),
          },
          {
            key: "2",
            label: (
              <a
                rel="noopener noreferrer"
                href={`${FE_ITEM_URL.EDIT}/${x._id}`}
              >
                Edit
              </a>
            ),
          },
          {
            key: "3",
            label: (
              <a
                rel="noopener noreferrer"
                onClick={() => showDeleteConfirm(x._id)}
              >
                Delete
              </a>
            ),
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
          category: x.description,
          price: x.price,
          description: x.description,
          // itemCategory: x.itemCategory,
          operation: oprtns,
        };
      });

      setTblItm(itmTbl);
    }
  }, [itemData, showDeleteConfirm]);

  useEffect(() => {
    handleLoadItemData();
  }, [handleLoadItemData]);

  return (
    <>
      <div className="p-4 sm:ml-64 h-screen bg-white">
        {/* title */}
        <div className="p-3 border-2 border-gray-200 rounded-lg dark:border-gray-700 mt-11">
          <HeaderModule title="Item" />
        </div>
        {/* body */}
        <div className="p-4 border-2 border-gray-200 rounded-lg dark:border-gray-700 mt-2">
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
