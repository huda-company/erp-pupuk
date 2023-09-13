"use client";

import { FormikContext, useFormik } from "formik";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { useAppDispatch } from "@/hooks";

import HeaderModule from "@/components/Header/HeaderModule";

import { actions as utilsActions } from "@/redux/utils";

import { addSupplier, getSupplierById } from "@/services/supplier/supplier";
import { APISuppliersResp } from "@/services/supplier/types";

import { StandardResp } from "@/app/api/types";

import SupplierForm from "../components/SupplierForm";
import { FE_SUPPLIER_URL, initAddEditSupplierForm } from "../config";
import { SupplierFormType } from "../types";
import AddEditSupplierSchema from "../validation";

export default function Page() {
  const urlParam = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  // eslint-disable-next-line no-unused-vars
  const [supplier, setSupplier] = useState<APISuppliersResp | undefined>(
    undefined
  );

  const handleLoadData = useCallback(async () => {
    if (urlParam?.id) {
      const res1: StandardResp = await getSupplierById(String(urlParam?.id));
      if (res1.success && res1.result) {
        setSupplier(res1.result);
      }
    }
  }, [urlParam?.id]);

  useEffect(() => {
    handleLoadData();
  }, [handleLoadData]);

  const handleSubmit = async (formikVal: SupplierFormType) => {
    const newSupp = await addSupplier(formikVal);
    if (newSupp.success) {
      await dispatch(
        utilsActions.callShowToast({
          variation: "Secondary",
          msg: "success",
          icon: {
            src: "/svg/SuccessCheck.svg",
          },
          timeout: 4000,
        })
      );

      await router.push(FE_SUPPLIER_URL.LIST);
    }
  };

  const formikBag = useFormik<SupplierFormType>({
    initialValues: initAddEditSupplierForm,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: AddEditSupplierSchema,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <div className="p-4 sm:ml-64 bg-white h-screen">
        {/* title */}
        <div className="p-3 border-2 border-gray-200 rounded-lg dark:border-gray-700 mt-11">
          <HeaderModule title="Add Supplier" />
        </div>
        {/* body */}
        <div className="p-4 border-2 border-gray-200 rounded-lg dark:border-gray-700 mt-2 bg-gray-100 flex flex-col gap-6">
          <FormikContext.Provider value={formikBag}>
            <SupplierForm mode="ADD" />
          </FormikContext.Provider>
        </div>
      </div>
    </>
  );
}
