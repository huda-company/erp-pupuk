"use client";

import { StandardResp } from "@/app/api/types";
import Table from "@/components/Table";
import { TableBody, TableData } from "@/components/Table/types";
import { getSuppliers } from "@/services/supplier/supplier";
import { APISuppliersResp } from "@/services/supplier/types";
import { useCallback, useEffect, useMemo, useState } from "react";
import { tableHeaders } from "./config";
import useMount from "@/hooks/useMount";
import { Tooltip, Typography } from "@material-tailwind/react";
import clsxm from "@/utils/clsxm";
import { BsFillTrashFill, BsPencilSquare } from "react-icons/bs";
import Icon from "@/components/Icon";
import { useRouter } from "next/navigation";
import { base_url } from "@/constants/env";

export default function Page() {
  const router = useRouter();
  const [supplierData, setSupplierData] = useState<APISuppliersResp[]>([]);
  const [tableBody, setTableBody] = useState<TableBody>([]);

  const getActions = useCallback(
    (id: string) => {
      const handleEdit = () => {
        router.push(`${base_url}/admin/supplier/edit/${id}`);
      };

      const handleDelete = async () => {
        console.log("aa");
      };

      return (
        <>
          <div className="flex h-[1.5rem] w-[4.688rem] items-center space-x-5 border-0 border-blue-900">
            <div className="flex w-4 items-center">
              <Tooltip tooltipText="Edit">
                <div
                  className="mt-[0.45rem] flex-shrink hover:cursor-pointer"
                  onClick={handleEdit}
                >
                  <BsPencilSquare />
                </div>
              </Tooltip>
            </div>

            <div className="mx-4 h-5 border-x-[0.031rem] border-blackOut" />
            <div className="flex w-4 items-center">
              <div
                className="mt-[0.5rem] flex-shrink hover:cursor-pointer"
                onClick={handleDelete}
              >
                <BsFillTrashFill key={`elm-${id}`} />
              </div>
            </div>
          </div>
        </>
      );
    },
    [router]
  );

  const handleLoadUserData = useCallback(async () => {
    const res1: StandardResp = await getSuppliers();
    if (res1.success) {
      const supp: APISuppliersResp[] = res1.result;
      setSupplierData(supp);
    }

    if (res1.success && Array.isArray(supplierData)) {
      const formattedBody =
        supplierData?.map((values) => ({
          items: [
            {
              value: values ? (
                <Typography color="black" className="text-sm">
                  {`${values.supplierCode}`}
                </Typography>
              ) : (
                " -- "
              ),
              className: "text-left w-[17.5rem] flex items-start break-words",
            },
            {
              value: (
                <Typography
                  color="black"
                  className={clsxm(
                    "text-sm ",
                    !values &&
                      "rounded-[0.938rem] bg-red-300 py-[0.5rem] pl-[0.5rem]"
                  )}
                >
                  {`${values.company}`}
                </Typography>
              ),
              className: "text-left w-[20rem] break-words",
            },
            {
              value: (
                <Typography
                  color="black"
                  className={clsxm(
                    "text-sm ",
                    !values &&
                      "rounded-[0.938rem] bg-red-300 py-[0.5rem] pl-[0.5rem]"
                  )}
                >
                  {`${values.tel}`}
                </Typography>
              ),
              className: "text-left w-[8rem] flex items-center justify-start",
            },
            {
              value: values ? getActions(String(values._id)) : "NO ACTION",
              className: "text-left w-[10rem] flex items-start",
            },
          ],
        })) || [];
      setTableBody(formattedBody);
    }
  }, [getActions, supplierData]);

  useEffect(() => {
    handleLoadUserData();
  }, [handleLoadUserData]);

  const tableData: TableData = useMemo(
    () => ({
      header: tableHeaders.emailPasswords,
      body: tableBody,
    }),
    [tableBody]
  );

  return (
    <div className="p-4 sm:ml-64 h-screen bg-white">
      <div className="p-4 border-2 border-gray-200 rounded-lg dark:border-gray-700 mt-11">
        <Typography className="text-xl text-black font-bold underline">
          Supplier
        </Typography>
      </div>
      <div className="p-4 border-2   border-gray-200 rounded-lg dark:border-gray-700 mt-2">
        <Table data={tableData} />
      </div>
    </div>
  );
}
