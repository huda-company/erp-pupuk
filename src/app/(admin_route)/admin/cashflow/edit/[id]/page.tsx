"use client";

import { FormikContext, useFormik } from "formik";
import moment from "moment";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import convToOpts from "@/utils/convToOpts";
import { useAppDispatch } from "@/hooks";
import useMount from "@/hooks/useMount";

import CustomBreadcrumb from "@/components/CustomBreadcrumb";
import { Option } from "@/components/Dropdown/types";
import HeaderModule from "@/components/Header/HeaderModule";

import { actions as utilsActions } from "@/redux/utils";

import { editCashflowTrx, getCashflowById } from "@/services/cashflow/cashflow";
import { APICashflowResp } from "@/services/cashflow/types";
import { getCashflowCategory } from "@/services/cashflowCategory/cashflowCategory";

import { StandardResp } from "@/app/api/types";

import ItemForm from "../../components/CashflowForm";
import { CASHFLOW_TYPES, EditItemBcItems, FE_CASHFLOW_URL } from "../../config";
import { CashflowFormAPIReqType, CashflowFormType } from "../../types";
import AddEditItemSchema from "../../validation";

export default function Page() {
  const urlParam = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [itm, setItm] = useState<APICashflowResp | undefined>(undefined);
  const [formVal, setFormVal] = useState<CashflowFormType | undefined>(
    undefined
  );
  const [itmCatOpts, setItmCatOpts] = useState<Option[]>([]);

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
      await getCashflowCategory();
    if (itmCatSuccess) {
      const itmCatOpts: Option[] = await convToOpts(itmCatRes, "_id", "name");
      setItmCatOpts(itmCatOpts);
    }

    const res1: StandardResp = await getCashflowById(String(urlParam?.id));
    if (res1.success && res1.result) {
      setItm(res1.result);
    }
  };

  useMount(() => {
    handleCallAPIs();
  });

  const handleSubmit = async (formikVal: CashflowFormType) => {
    const params: CashflowFormAPIReqType = {
      _id: formikVal?._id,
      type: formikVal.typeOpt.id,
      cashflowCategory: formikVal?.cashflowCategoryOpt.id,
      date: String(formikVal?.date),
      amount: formikVal?.amount,
      description: String(formikVal?.description),
    };

    const newSupp = await editCashflowTrx(params);
    if (newSupp.success) {
      await dispatch(
        utilsActions.callShowToast({
          type: "success",
          msg: "item udpated successfully",
          timeout: 3000,
        })
      );

      await router.push(`${FE_CASHFLOW_URL.LIST}`);
    }
  };

  const formikBag = useFormik<CashflowFormType>({
    initialValues: formVal as CashflowFormType,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: AddEditItemSchema,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <div className="p-2 bg-white min-h-screen">
        {/* title */}
        <div className="flex justify-between p-2 border-2 border-gray-200 rounded-lg dark:border-gray-700">
          <HeaderModule title="Edit Cashflow" />
          <CustomBreadcrumb items={EditItemBcItems} />
        </div>
        {/* body */}
        <div className="p-2 border-2 border-gray-200 rounded-lg dark:border-gray-700 mt-2 bg-gray-100 flex flex-col gap-6">
          <FormikContext.Provider value={formikBag}>
            <ItemForm cashflowCatOpts={itmCatOpts} mode="EDIT" />
          </FormikContext.Provider>
        </div>
      </div>
    </>
  );
}
