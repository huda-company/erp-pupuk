"use client";
import { Button as BtnAntd, Dropdown, Modal, Table as TableAntd } from "antd";
import { ColumnsType } from "antd/es/table";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";

import useMount from "@/hooks/useMount";

import HeaderModule from "@/components/Header/HeaderModule";
import Popup from "@/components/Popup";
import AreUsure from "@/components/Popup/AreUsure";

import { deleteSupplier, getSuppliers } from "@/services/supplier/supplier";
import { APISuppliersResp } from "@/services/supplier/types";

import { StandardResp } from "@/app/api/types";

import { FE_SUPPLIER_URL } from "./config";
import { SuppAntdDataType } from "./types";

export default function Page() {
  const { confirm } = Modal;

  const [tblItm, setTblItm] = useState<SuppAntdDataType[]>([]);
  const [supplierData, setSupplierData] = useState<APISuppliersResp[]>([]);
  const [showDelPop, setShowDelPop] = useState<boolean>(false);
  const [deleted, setDeletedId] = useState<string>("");

  const suppAntdColumns: ColumnsType<SuppAntdDataType> = [
    {
      title: "Code",
      width: 100,
      dataIndex: "supplierCode",
      key: "supplierCode",
      fixed: "left",
    },
    {
      title: "Name",
      width: 200,
      dataIndex: "company",
      key: "company",
      fixed: "left",
      sorter: true,
    },
    { title: "Phone", dataIndex: "tel", key: "tel", width: 150 },
    { title: "Email", dataIndex: "email", key: "email", width: 150 },
    { title: "Address", dataIndex: "address", key: "address", width: 150 },
    {
      title: "Action",
      dataIndex: "operation",
      key: "operation",
      fixed: "right",
      width: 62,
    },
  ];

  const handleCallAPI = async () => {
    const res1: StandardResp = await getSuppliers();
    if (res1.success) {
      const supp: APISuppliersResp[] = res1.result;
      setSupplierData(supp);
    }
  };

  useMount(() => {
    handleCallAPI();
  });

  const handleDeleteSubmit = async () => {
    const resDel: StandardResp = await deleteSupplier(deleted);
    if (resDel.success) {
      const newItems: StandardResp = await getSuppliers();
      await setSupplierData(newItems.result);
      setDeletedId("");
      setShowDelPop(false);
    }
  };

  const handleLoadSuppData = useCallback(async () => {
    if (Array.isArray(supplierData)) {
      const itmTbl: SuppAntdDataType[] = supplierData.map((x) => {
        const showDeleteConfirm = (id: string) => {
          setDeletedId(id);
          confirm({
            title: "Are you sure delete this data?",
            // content: "Some descriptions",
            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            centered: true,
            onOk: () => handleDeleteSubmit(),
            onCancel() {
              setShowDelPop(false);
              setDeletedId(id);
            },
          });
        };

        const items = [
          {
            key: "1",
            label: (
              <a
                rel="noopener noreferrer"
                href={`${FE_SUPPLIER_URL.READ}/${x._id}`}
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
                href={`${FE_SUPPLIER_URL.EDIT}/${x._id}`}
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
          supplierCode: x.supplierCode,
          company: x.company,
          tel: x.tel.toUpperCase(),
          email: x.email.toUpperCase(),
          address: x.address.toUpperCase(),
          operation: oprtns,
        };
      });

      setTblItm(itmTbl);
    }
  }, [supplierData]);

  useEffect(() => {
    handleLoadSuppData();
  }, [handleLoadSuppData]);

  return (
    <>
      <Popup
        show={showDelPop}
        variation="Secondary"
        msg={AreUsure}
        buttonCloseText="No"
        buttonSubmitText="Yes"
        onSubmit={() => handleDeleteSubmit()}
        onClose={() => setShowDelPop(false)}
      />

      <div className="p-4 sm:ml-64 h-screen bg-white">
        {/* title */}
        <div className="p-3 border-2 border-gray-200 rounded-lg dark:border-gray-700 mt-11">
          <HeaderModule title="Supplier" />
        </div>
        {/* body */}
        <div className="p-4 border-2 border-gray-200 rounded-lg dark:border-gray-700 mt-2">
          <div className="pb-[0.5rem] flex justify-end pr-[2.5rem]">
            <Link href={`${FE_SUPPLIER_URL.CREATE}`}>
              <BtnAntd style={{ backgroundColor: "#338DFF" }} type="primary">
                +
              </BtnAntd>
            </Link>
          </div>
          <TableAntd
            columns={suppAntdColumns}
            dataSource={tblItm}
            pagination={{ pageSize: 50 }}
            scroll={{ x: 1300 }}
          />
        </div>
      </div>
    </>
  );
}
