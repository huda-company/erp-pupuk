"use client";

import { StandardResp } from "@/app/api/types";
import { addSupplier, getSupplierById } from "@/services/supplier/supplier";
import { APISuppliersResp } from "@/services/supplier/types";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import SupplierForm from "../components/SupplierForm";
import { FormikContext, useFormik } from "formik";
import { SupplierFormType } from "../types";
import { FE_SUPPLIER_URL, initAddEditSupplierForm } from "../config";
import AddEditSupplierSchema from "../validation";
import { Typography } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { base_url } from "@/constants/env";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { actions as utilsActions } from "@/redux/utils";
import { selectors as toastSelectors } from "@/redux/toast";

export default function Page() {
  const urlParam = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { toast } = useAppSelector(toastSelectors.toast);

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
        <div className="p-4 border-2 border-gray-200 rounded-lg dark:border-gray-700 mt-11 flex flex-row">
          <div className="left-0 w-[50%]">
            <Typography className="text-[2rem] text-black font-bold underline float-left">
              Add Supplier
            </Typography>
          </div>
        </div>
        <div className="p-4 border-2 border-gray-200 rounded-lg dark:border-gray-700 mt-2 bg-gray-100 flex flex-col gap-6">
          <FormikContext.Provider value={formikBag}>
            <SupplierForm mode="ADD" />
          </FormikContext.Provider>
        </div>
      </div>
    </>
  );
}
