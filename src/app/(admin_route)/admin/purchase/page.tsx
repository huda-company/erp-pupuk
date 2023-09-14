"use client";
import { Button as BtnAntd, Dropdown, Modal, Table as TableAntd } from "antd";
import { ColumnsType } from "antd/es/table";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";

import useMount from "@/hooks/useMount";

import HeaderModule from "@/components/Header/HeaderModule";

import { deletePurchase, getPurchases } from "@/services/purchase/purchase";
import { APIPurchaseResp } from "@/services/purchase/types";

import { StandardResp } from "@/app/api/types";

import { FE_PURCHASING_URL } from "./config";
import { AntdDataType } from "./types";

export default function Page() {
  const { confirm } = Modal;
  const [tblItm, setTblItm] = useState<AntdDataType[]>([]);
  const [itemData, setItemData] = useState<APIPurchaseResp[]>([]);

  const purchaseAntdColumns: ColumnsType<AntdDataType> = [
    {
      title: "PO",
      width: 200,
      dataIndex: "poNo",
      key: "poNo",
      fixed: "left",
    },
    {
      title: "Supplier",
      width: 200,
      dataIndex: "company",
      key: "company",
      fixed: "left",
      sorter: true,
    },
    { title: "Status", dataIndex: "status", key: "status", width: 150 },
    { title: "Date", dataIndex: "date", key: "date", width: 150 },
    { title: "Exp Date", dataIndex: "expDate", key: "expDate", width: 150 },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      width: 150,
    },
    {
      title: "Payment Method",
      dataIndex: "purchPaymentMethod",
      key: "purchPaymentMethod",
      width: 150,
    },
    { title: "Note", dataIndex: "note", key: "note", width: 150 },
    { title: "Sub Total", dataIndex: "subTotal", key: "subTotal", width: 100 },
    { title: "Tax Total", dataIndex: "taxTotal", key: "taxTotal", width: 100 },
    {
      title: "Grand Total",
      dataIndex: "grandTotal",
      key: "grandTotal",
      width: 150,
    },
    {
      title: "Action",
      dataIndex: "operation",
      key: "operation",
      fixed: "right",
      width: 100,
    },
  ];

  const handleCallAPI = async () => {
    const res1: StandardResp = await getPurchases();
    if (res1.success) {
      const supp: APIPurchaseResp[] = res1.result;
      setItemData(supp);
    }
  };

  useMount(() => {
    handleCallAPI();
  });

  const showDeleteConfirm = useCallback(
    (id: string) => {
      confirm({
        title: "Are you sure delete this data?",
        // content: "Some descriptions",
        okText: "Yes",
        okType: "danger",
        cancelText: "No",
        centered: true,
        async onOk() {
          const resDel: StandardResp = await deletePurchase(id);
          if (resDel.success) {
            const newItems: StandardResp = await getPurchases();
            await setItemData(newItems.result);
          }
        },
      });
    },
    [confirm]
  );

  const handleLoadItemData = useCallback(async () => {
    if (Array.isArray(itemData)) {
      const itmTbl: AntdDataType[] = itemData.map((x) => {
        const items = [
          {
            key: "1",
            label: (
              <a
                rel="noopener noreferrer"
                href={`${FE_PURCHASING_URL.READ}/${x._id}`}
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
                href={`${FE_PURCHASING_URL.EDIT}/${x._id}`}
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
          poNo: x.poNo,
          company: x.supplier.company,
          status: x.status.toUpperCase(),
          date: new Date(x.date).toISOString().split("T")[0],
          expDate: new Date(x.expDate).toISOString().split("T")[0],
          paymentStatus: x.paymentStatus.toUpperCase(),
          purchPaymentMethod: x.purchPaymentMethod.toUpperCase(),
          note: x.note,
          subTotal: x.subTotal,
          taxTotal: x.taxTotal,
          grandTotal: x.grandTotal,
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
          <HeaderModule title="Purchase" />
        </div>
        {/* body */}
        <div className="p-4 border-2 border-gray-200 rounded-lg dark:border-gray-700 mt-2">
          <div className="pb-[0.5rem] flex justify-end pr-[2.5rem]">
            <Link href={`${FE_PURCHASING_URL.CREATE}`}>
              <BtnAntd style={{ backgroundColor: "#338DFF" }} type="primary">
                +
              </BtnAntd>
            </Link>
          </div>
          <TableAntd
            columns={purchaseAntdColumns}
            dataSource={tblItm}
            pagination={{ pageSize: 50 }}
            scroll={{ x: 1300 }}
          />
        </div>
      </div>
    </>
  );
}
