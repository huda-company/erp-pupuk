"use client";

import { FormikContext, useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";

import convToOpts from "@/utils/convToOpts";
import { useAppDispatch } from "@/hooks";
import useMount from "@/hooks/useMount";

import CustomBreadcrumb from "@/components/CustomBreadcrumb";
import { Option } from "@/components/Dropdown/types";
import HeaderModule from "@/components/Header/HeaderModule";

import { actions as utilsActions } from "@/redux/utils";

import { addCashflowTrx } from "@/services/cashflow/cashflow";
import { getCashflowCategory } from "@/services/cashflowCategory/cashflowCategory";

import { StandardResp } from "@/app/api/types";

import CashflowForm from "../components/CashflowForm";
import {
  AddItemBcItems,
  FE_CASHFLOW_URL,
  initAddEditItemForm,
} from "../config";
import { CashflowFormAPIReqType, CashflowFormType } from "../types";
import AddEditSupplierSchema from "../validation";

export default function Page() {
  const router = useRouter();
  const { data: sessionData } = useSession();
  const dispatch = useAppDispatch();

  const [itmCatOpts, setItmCatOpts] = useState<Option[]>([]);

  const handleCallAPIs = async () => {
    const { success: itmCatSuccess, result: itmCatRes }: StandardResp =
      await getCashflowCategory();
    if (itmCatSuccess) {
      const itmCatOpts: Option[] = await convToOpts(itmCatRes, "_id", "name");
      setItmCatOpts(itmCatOpts);
    }
  };

  useMount(() => {
    handleCallAPIs();
  });

  const handleSubmit = async (formikVal: CashflowFormType) => {
    const params: CashflowFormAPIReqType = {
      cashflowCategory: formikVal.cashflowCategoryOpt.id,
      type: formikVal.typeOpt.id,
      date: formikVal.date,
      createdBy: String(sessionData?.user.id),
      amount: formikVal.amount,
      description: formikVal.description,
    };
    const newSupp = await addCashflowTrx(params);
    if (newSupp.success) {
      await dispatch(
        utilsActions.callShowToast({
          type: "success",
          title: "Sucessfully created",
          msg: "new item successfully created",
          timeout: 3000,
        })
      );

      await router.push(FE_CASHFLOW_URL.LIST);
    }
  };

  const formikBag = useFormik<CashflowFormType>({
    initialValues: initAddEditItemForm,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: AddEditSupplierSchema,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <div className="p-2 bg-white min-h-screen">
        {/* title */}
        <div className="flex justify-between p-2 border-2 border-gray-200 rounded-lg dark:border-gray-700">
          <HeaderModule title="Add Cashflow" />
          <CustomBreadcrumb items={AddItemBcItems} />
        </div>
        {/* body */}
        <div className="p-2 border-2 border-gray-200 rounded-lg dark:border-gray-700 mt-2 bg-gray-100 flex flex-col gap-6">
          <FormikContext.Provider value={formikBag}>
            <CashflowForm cashflowCatOpts={itmCatOpts} mode="ADD" />
          </FormikContext.Provider>
        </div>
      </div>
    </>
  );
}
