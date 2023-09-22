"use client";

import { FormikContext, useFormik } from "formik";
import moment from "moment";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import convToOpts from "@/utils/convToOpts";
import { noop } from "@/utils/helpers";
import { useAppDispatch } from "@/hooks";
import useMount from "@/hooks/useMount";

import CustomBreadcrumb from "@/components/CustomBreadcrumb";
import { Option } from "@/components/Dropdown/types";
import HeaderModule from "@/components/Header/HeaderModule";

import { APICashflowResp } from "@/services/cashflow/types";
import { getItemById } from "@/services/item/item";
import { getItemCategory } from "@/services/itemCategory/itemCategory";

import { StandardResp } from "@/app/api/types";

import ItemForm from "../../components/CashflowForm";
import { CASHFLOW_TYPES, ReadItemBcItems } from "../../config";
import { CashflowFormType } from "../../types";
import AddEditSupplierSchema from "../../validation";

export default function Page() {
  const urlParam = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [itm, setItm] = useState<APICashflowResp | undefined>(undefined);
  const [itmCatOpts, setItmCatOpts] = useState<Option[]>([]);

  const [formVal, setFormVal] = useState<CashflowFormType | undefined>(
    undefined
  );

  const setInitFormVal = useCallback(() => {
    if (itm) {
      const val: CashflowFormType = {
        _id: itm._id,
        typeOpt: CASHFLOW_TYPES.find((x) => x.id == itm?.type) as Option,
        cashflowCategoryOpt: itmCatOpts.find(
          (x) => x.id == itm?.cashflowCategory._id
        ) as Option,
        date: moment(itm.date).format("YYYY-MM-DD"),
        type: itm.type,
        amount: itm.amount,
        description: itm.description,
      };
      setFormVal(val);
    }
  }, [itm, itmCatOpts]);

  useEffect(() => {
    setInitFormVal();
  }, [setInitFormVal]);

  const handleCallAPIs = async () => {
    const { success: itmCatSuccess, result: itmCatRes }: StandardResp =
      await getItemCategory();
    if (itmCatSuccess) {
      const itmCatOpts: Option[] = await convToOpts(itmCatRes, "_id", "name");
      setItmCatOpts(itmCatOpts);
    }

    const res1: StandardResp = await getItemById(String(urlParam?.id));
    if (res1.success && res1.result) {
      setItm(res1.result);
    }
  };

  useMount(() => {
    handleCallAPIs();
  });

  const formikBag = useFormik<CashflowFormType>({
    initialValues: formVal as CashflowFormType,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: AddEditSupplierSchema,
    onSubmit: noop,
  });

  return (
    <>
      <div className="p-2 bg-white min-h-screen">
        {/* title */}
        <div className="flex justify-between p-2 border-2 border-gray-200 rounded-lg dark:border-gray-700">
          <HeaderModule title="Detail Item" />
          <CustomBreadcrumb items={ReadItemBcItems} />
        </div>
        {/* body */}
        <div className="p-2 border-2 border-gray-200 rounded-lg dark:border-gray-700 mt-2 bg-gray-100 flex flex-col gap-6">
          <FormikContext.Provider value={formikBag}>
            <ItemForm cashflowCatOpts={itmCatOpts} mode="READ" />
          </FormikContext.Provider>
        </div>
      </div>
    </>
  );
}
