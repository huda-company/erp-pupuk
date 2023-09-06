"use client";

import { StandardResp } from "@/app/api/types";
import { getSupplierById } from "@/services/supplier/supplier";
import { APISuppliersResp } from "@/services/supplier/types";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import SupplierForm from "../components/SupplierForm";
import { FormikContext, useFormik } from "formik";
import { SupplierFormType } from "../types";
import { initAddEditSupplierForm } from "../config";
import AddEditSupplierSchema from "../validation";
import { Typography } from "@material-tailwind/react";

export default function Page() {
  const urlParam = useParams();

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

  const handleSubmit = (formikVal: SupplierFormType) => {
    console.log("formikVal", formikVal);
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
    <div className="p-4 sm:ml-64 bg-white h-screen">
      <div className="p-4 border-2 border-gray-200 rounded-lg dark:border-gray-700 mt-11">
        <Typography className="text-xl text-black font-bold underline">
          Add Supplier
        </Typography>
      </div>
      <div className="p-4 border-2 border-gray-200 rounded-lg dark:border-gray-700 mt-2 bg-gray-100 flex flex-col gap-6">
        <FormikContext.Provider value={formikBag}>
          <SupplierForm />
        </FormikContext.Provider>
      </div>
    </div>
  );
}
