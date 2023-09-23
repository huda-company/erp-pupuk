"use client";

import { Button as BtnAntd, Dropdown, Modal, Table as TableAntd } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";

import useMount from "@/hooks/useMount";

import CustomBreadcrumb from "@/components/CustomBreadcrumb";
import HeaderModule from "@/components/Header/HeaderModule";

import { deleteItem, getBranches } from "@/services/branch/branch";
import { APIBranchResp } from "@/services/branch/types";

import { StandardResp } from "@/app/api/types";

import { branchAntdColumns, BranchBcBaseItems, FE_BRANCH_URL } from "./config";
import { BranchAntdDataType } from "./types";

export default function Page() {
  const { confirm } = Modal;
  const router = useRouter();
  const [itemData, setItemData] = useState<APIBranchResp[]>([]);
  const [tblItm, setTblItm] = useState<BranchAntdDataType[]>([]);

  const handleCallAPI = async () => {
    const res1: StandardResp = await getBranches();
    if (res1.success) {
      const supp: APIBranchResp[] = res1.result;
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
            const newItems: StandardResp = await getBranches();
            await setItemData(newItems.result);
          }
        },
      });
    },
    [confirm]
  );

  const handleLoadItemData = useCallback(async () => {
    if (Array.isArray(itemData)) {
      const itmTbl: BranchAntdDataType[] = itemData.map((x) => {
        const items = [
          {
            key: "1",
            onClick: () => {
              router.push(`${FE_BRANCH_URL.READ}/${x._id}`);
            },
            label: "Details",
          },
          {
            key: "2",
            onClick: () => {
              router.push(`${FE_BRANCH_URL.EDIT}/${x._id}`);
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
          city: x.city,
          address: x.address,
          description: x.description,
          operation: oprtns,
        };
      });

      setTblItm(itmTbl);
    }
  }, [itemData, router, showDeleteConfirm]);

  useEffect(() => {
    handleLoadItemData();
  }, [handleLoadItemData]);

  return (
    <>
      <div className="p-2 min-h-screen bg-white">
        {/* title */}
        <div className="flex justify-between p-2 border-2 border-gray-200 rounded-lg dark:border-gray-700">
          <HeaderModule title="Branch" />
          <CustomBreadcrumb items={BranchBcBaseItems} />
        </div>
        {/* body */}
        <div className="p-2 border-2 border-gray-200 rounded-lg dark:border-gray-700 mt-2">
          <div className="pb-[0.5rem] flex justify-end pr-[2.5rem]">
            <Link href={`${FE_BRANCH_URL.CREATE}`}>
              <BtnAntd style={{ backgroundColor: "#338DFF" }} type="primary">
                +
              </BtnAntd>
            </Link>
          </div>
          <TableAntd
            columns={branchAntdColumns}
            dataSource={tblItm}
            pagination={{ pageSize: 50 }}
            scroll={{ x: 1300 }}
          />
        </div>
      </div>
    </>
  );
}
