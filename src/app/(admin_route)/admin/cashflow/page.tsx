"use client";
import { Button as BtnAntd, Dropdown, Modal, Table as TableAntd } from "antd";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";

import calculateTotalFromArray from "@/utils/calculateTotalFromArray";
import useMount from "@/hooks/useMount";

import CustomBreadcrumb from "@/components/CustomBreadcrumb";
import HeaderModule from "@/components/Header/HeaderModule";

import { getCashflowData } from "@/services/cashflow/cashflow";
import { APICashflowResp } from "@/services/cashflow/types";
import { deleteItem, getItems } from "@/services/item/item";

import { StandardResp } from "@/app/api/types";

import { FE_CASHFLOW_URL, itemAntdColumns, ItemBcBaseItems } from "./config";
import { CashflowAntdDataType } from "./types";

export default function Page() {
  const { confirm } = Modal;
  const router = useRouter();
  const [tblItm, setTblItm] = useState<CashflowAntdDataType[]>([]);
  const [itemData, setItemData] = useState<APICashflowResp[]>([]);

  const handleCallAPI = async () => {
    const res1: StandardResp = await getCashflowData();
    if (res1.success) {
      const supp: APICashflowResp[] = res1.result;
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
      const itmTbl: CashflowAntdDataType[] = itemData.map((x) => {
        const items = [
          {
            key: "1",
            onClick: () => {
              router.push(`${FE_CASHFLOW_URL.READ}/${x._id}`);
            },
            label: "Details",
          },
          {
            key: "2",
            onClick: () => {
              router.push(`${FE_CASHFLOW_URL.EDIT}/${x._id}`);
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
          date: moment(x.date).format("YYYY-MM-DD H:mm"),
          created: moment(x.created).format("YYYY-MM-DD H:mm"),
          type: x.type,
          cashflowCategory: x.cashflowCategory.name,
          amount: x.amount,
          description: x.description,
          creatorName: x.createdBy.name,
          operation: oprtns,
        };
      });

      setTblItm(itmTbl);
    }
  }, [itemData, router, showDeleteConfirm]);

  useEffect(() => {
    handleLoadItemData();
  }, [handleLoadItemData]);

  const renderExpandedRow = (param: CashflowAntdDataType) => {
    return (
      <>
        <p style={{ margin: 0 }}>Created By : {param.creatorName}</p>
        <p style={{ margin: 0 }}>Description : {param.description}</p>
      </>
    );
  };

  return (
    <>
      <div className="p-2 h-screen bg-white">
        {/* title */}
        <div className="flex justify-between p-2 border-2 border-gray-200 rounded-lg dark:border-gray-700">
          <HeaderModule title="Cashflow" />
          <CustomBreadcrumb items={ItemBcBaseItems} />
        </div>
        {/* body */}
        <div className="flex justify-between gap-5">
          {/* Income */}
          <div className="w-[50%] p-2 border-2 border-gray-200 rounded-lg dark:border-gray-700 mt-2">
            <div className="pb-[0.5rem] flex justify-between pr-[2.5rem]">
              <span className="text-3xl underline">Income</span>
              <Link href={`${FE_CASHFLOW_URL.CREATE}`}>
                <BtnAntd style={{ backgroundColor: "#338DFF" }} type="primary">
                  +
                </BtnAntd>
              </Link>
            </div>
            <div className="flex flex-row gap-10 pb-[1rem]">
              <span>Total </span>
              <span>
                : Rp{" "}
                {calculateTotalFromArray(
                  tblItm.filter((x) => x.type == "income"),
                  "amount"
                )}
              </span>
            </div>
            <TableAntd
              columns={itemAntdColumns}
              dataSource={tblItm.filter((x) => x.type == "income")}
              pagination={false}
              expandable={{
                expandedRowRender: (record) => renderExpandedRow(record),
                rowExpandable: (record) => record.description !== "",
              }}
            />
          </div>
          {/* expense */}
          <div className="w-[50%] p-2 border-2 border-gray-200 rounded-lg dark:border-gray-700 mt-2">
            <div className="pb-[0.5rem] flex justify-between pr-[2.5rem]">
              <span className="text-3xl underline">Expense</span>
              <Link href={`${FE_CASHFLOW_URL.CREATE}`}>
                <BtnAntd style={{ backgroundColor: "#338DFF" }} type="primary">
                  +
                </BtnAntd>
              </Link>
            </div>
            <div className="flex flex-row gap-10 pb-[1rem]">
              <span>Total </span>
              <span>
                : Rp{" "}
                {calculateTotalFromArray(
                  tblItm.filter((x) => x.type == "expense"),
                  "amount"
                )}
              </span>
            </div>
            <TableAntd
              columns={itemAntdColumns}
              dataSource={tblItm.filter((x) => x.type == "expense")}
              pagination={false}
              expandable={{
                expandedRowRender: (record) => renderExpandedRow(record),
                rowExpandable: (record) => record.description !== "",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
