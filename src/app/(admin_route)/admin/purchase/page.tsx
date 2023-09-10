"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { BsFillTrashFill, BsPencilSquare } from "react-icons/bs";

import clsxm from "@/utils/clsxm";
import useMount from "@/hooks/useMount";

import Button from "@/components/Button";
import HeaderModule from "@/components/Header/HeaderModule";
import Popup from "@/components/Popup";
import AreUsure from "@/components/Popup/AreUsure";
import Table from "@/components/Table";
import { TableBody, TableData } from "@/components/Table/types";
import Tooltip from "@/components/Tooltip";
import Typography from "@/components/Typography";

import { deletePurchase, getPurchases } from "@/services/purchase/purchase";
import { APIPurchaseResp } from "@/services/purchase/types";

import { StandardResp } from "@/app/api/types";

import { FE_PURCHASING_URL, tableHeaders } from "./config";

export default function Page() {
  const router = useRouter();

  const [itemData, setItemData] = useState<APIPurchaseResp[]>([]);
  const [tableBody, setTableBody] = useState<TableBody>([]);
  const [showDelPop, setShowDelPop] = useState<boolean>(false);
  const [deleted, setDeletedId] = useState<string>("");

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

  const handleDeleteSubmit = async () => {
    const resDel: StandardResp = await deletePurchase(deleted);
    if (resDel.success) {
      const newItems: StandardResp = await getPurchases();
      await setItemData(newItems.result);
      setDeletedId("");
      setShowDelPop(false);
    }
  };

  const getActions = useCallback(
    (id: string) => {
      const handleEdit = () => {
        router.push(`${FE_PURCHASING_URL.EDIT}/${id}`);
      };

      const handleRead = () => {
        router.push(`${FE_PURCHASING_URL.READ}/${id}`);
      };

      const handleDelete = async (id: string) => {
        setShowDelPop(true);
        setDeletedId(id);
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
                onClick={() => handleDelete(id)}
              >
                <BsFillTrashFill key={`elm-${id}`} />
              </div>
            </div>

            <div className="mx-4 h-5 border-x-[0.031rem] border-blackOut" />

            <div className="flex w-4 items-center">
              <div
                className="mt-[0.5rem] flex-shrink hover:cursor-pointer"
                onClick={handleRead}
              >
                <AiFillEye key={`elm-${id}`} />
              </div>
            </div>
          </div>
        </>
      );
    },
    [router]
  );

  const handleLoadItemData = useCallback(async () => {
    if (Array.isArray(itemData)) {
      const formattedBody =
        itemData?.map((values) => ({
          items: [
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
                  {`${values.poNo}`}
                </Typography>
              ),
              className: "text-left w-[14rem] break-words",
            },
            {
              value: values ? (
                <Typography color="black" className="text-sm">
                  {`${values.supplier.company}`}
                </Typography>
              ) : (
                " -- "
              ),
              className: "text-left w-[12rem] flex items-start break-words",
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
                  {`${new Date(values.expDate).toISOString().split("T")[0]}`}
                </Typography>
              ),
              className: "text-left w-[10rem] flex items-center justify-start",
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
                  {`${values.grandTotal}`}
                </Typography>
              ),
              className: "text-left w-[12rem] flex items-center justify-start",
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
                  {`${values.status.toUpperCase()}`}
                </Typography>
              ),
              className: "text-left w-[10rem] flex items-center justify-start",
            },
            {
              value: values ? getActions(String(values._id)) : "NO ACTION",
              className: "text-left w-[10rem] flex items-start",
            },
          ],
        })) || [];
      setTableBody(formattedBody);
    }
  }, [getActions, itemData]);

  useEffect(() => {
    handleLoadItemData();
  }, [handleLoadItemData]);

  const tableData: TableData = useMemo(
    () => ({
      header: tableHeaders.itmListHeader,
      body: tableBody,
    }),
    [tableBody]
  );

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
        <div className="p-4 border-2 border-gray-200 rounded-lg dark:border-gray-700 mt-11 flex flex-row">
          <div className="left-0 w-[50%] pt-[1rem]">
            <HeaderModule title="Purchase" />
          </div>

          <div className="right-0 w-[50%]">
            <Link href={`${FE_PURCHASING_URL.CREATE}`}>
              <Button
                size="xs"
                className="bg-blue-500 w-[10px] float-right p-0 min-w-[5rem]"
              >
                <Typography className="font-bold text-base">ADD</Typography>
              </Button>
            </Link>
          </div>
        </div>
        <div className="p-4 border-2 border-gray-200 rounded-lg dark:border-gray-700 mt-2">
          <Table data={tableData} />
        </div>
      </div>
    </>
  );
}
