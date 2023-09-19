"use client";
import { Button as BtnAntd, Dropdown, Modal, Table as TableAntd } from "antd";
import { ColumnsType } from "antd/es/table";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";

import useMount from "@/hooks/useMount";

import HeaderModule from "@/components/Header/HeaderModule";

import { deleteSupplier, getSuppliers } from "@/services/supplier/supplier";
import { APISuppliersResp } from "@/services/supplier/types";

import { StandardResp } from "@/app/api/types";

import { FE_SUPPLIER_URL } from "./config";
import { SuppAntdDataType } from "./types";

export default function Page() {
  const { confirm } = Modal;
  const router = useRouter();

  const [tblItm, setTblItm] = useState<SuppAntdDataType[]>([]);
  const [supplierData, setSupplierData] = useState<APISuppliersResp[]>([]);

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
          const resDel: StandardResp = await deleteSupplier(id);
          if (resDel.success) {
            const newItems: StandardResp = await getSuppliers();
            await setSupplierData(newItems.result);
          }
        },
        onCancel() {},
      });
    },
    [confirm]
  );

  const handleLoadSuppData = useCallback(async () => {
    if (Array.isArray(supplierData)) {
      const itmTbl: SuppAntdDataType[] = supplierData.map((x) => {
        const items = [
          {
            key: "1",
            onClick: () => {
              router.push(`${FE_SUPPLIER_URL.READ}/${x._id}`);
            },
            label: "Details",
          },
          {
            key: "2",
            onClick: () => {
              router.push(`${FE_SUPPLIER_URL.EDIT}/${x._id}`);
            },
            label: "Edit",
          },
          {
            key: "3",
            onClick: () => showDeleteConfirm(x._id),
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
  }, [router, showDeleteConfirm, supplierData]);

  useEffect(() => {
    handleLoadSuppData();
  }, [handleLoadSuppData]);

  return (
    <>
      <div className="p-2 min-h-screen bg-white">
        {/* title */}
        <div className="p-3 border-2 border-gray-200 rounded-lg dark:border-gray-700 ">
          <HeaderModule title="Supplier" />
        </div>
        {/* body */}
        <div className="p-2 border-2 border-gray-200 rounded-lg dark:border-gray-700 mt-2">
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
