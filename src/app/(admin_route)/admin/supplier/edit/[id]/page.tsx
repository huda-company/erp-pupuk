"use client";

import { FormikContext, useFormik } from "formik";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { useAppDispatch } from "@/hooks";
import useMount from "@/hooks/useMount";

import CustomBreadcrumb from "@/components/CustomBreadcrumb";
import HeaderModule from "@/components/Header/HeaderModule";

import { actions as utilsActions } from "@/redux/utils";

import { editSupplier, getSupplierById } from "@/services/supplier/supplier";
import { APISuppliersResp } from "@/services/supplier/types";

import { StandardResp } from "@/app/api/types";

import SupplierForm from "../../components/SupplierForm";
import { EditSuppBcItems, FE_SUPPLIER_URL } from "../../config";
import { SupplierFormType } from "../../types";
import AddEditSupplierSchema from "../../validation";

export default function Page() {
  const urlParam = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [supplier, setSupplier] = useState<APISuppliersResp | undefined>(
    undefined
  );
  const [formVal, setFormVal] = useState<SupplierFormType | undefined>(
    undefined
  );

  const handleLoadData = useCallback(async () => {
    if (supplier) {
      const val: SupplierFormType = {
        _id: supplier._id,
        address: supplier.address,
        company: supplier.company,
        bankAccount: supplier.bankAccount,
        email: supplier.email,
        managerName: supplier.managerName,
        managerSurname: supplier.managerSurname,
        tel: supplier.tel,
      };
      setFormVal(val);
    }
  }, [supplier]);

  useEffect(() => {
    handleLoadData();
  }, [handleLoadData]);

  const handleCallAPIs = async () => {
    const res1: StandardResp = await getSupplierById(String(urlParam?.id));
    if (res1.success && res1.result) {
      setSupplier(res1.result);
    }
  };

  useMount(() => {
    handleCallAPIs();
  });

  const handleSubmit = async (formikVal: SupplierFormType) => {
    const newSupp = await editSupplier(formikVal);
    if (newSupp.success) {
      await dispatch(
        utilsActions.callShowToast({
          type: "success",
          msg: "success",
          icon: {
            src: "/svg/SuccessCheck.svg",
          },
          timeout: 4000,
        })
      );

      await router.push(`${FE_SUPPLIER_URL.READ}/${formikVal._id}`);
    }
  };

  const formikBag = useFormik<SupplierFormType>({
    initialValues: formVal as SupplierFormType,
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
        <div className="flex justify-between p-2 border-2 border-gray-200 rounded-lg dark:border-gray-700 ">
          <HeaderModule title="Edit Supplier" />
          <CustomBreadcrumb items={EditSuppBcItems} />
        </div>
        {/* body */}
        <div className="p-2 border-2 border-gray-200 rounded-lg dark:border-gray-700 mt-2 bg-gray-100 flex flex-col gap-6">
          <FormikContext.Provider value={formikBag}>
            <SupplierForm mode="EDIT" />
          </FormikContext.Provider>
        </div>
      </div>
    </>
  );
}
