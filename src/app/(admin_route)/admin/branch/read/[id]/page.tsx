"use client";

import { FormikContext, useFormik } from "formik";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { useAppDispatch } from "@/hooks";
import useMount from "@/hooks/useMount";

import { base_url } from "@/constants/env";

import CustomBreadcrumb from "@/components/CustomBreadcrumb";
import HeaderModule from "@/components/Header/HeaderModule";

import { actions as utilsActions } from "@/redux/utils";

import { editBranch, getBranchById } from "@/services/branch/branch";
import { APIBranchResp } from "@/services/branch/types";

import { StandardResp } from "@/app/api/types";

import BranchForm from "../../components/BranchForm";
import { ReadItemBcItems } from "../../config";
import { BranchFormReqType } from "../../types";
import AddEditBranchSchema from "../../validation";

export default function Page() {
  const urlParam = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [branch, setBranch] = useState<APIBranchResp | undefined>(undefined);
  const [formVal, setFormVal] = useState<BranchFormReqType | undefined>(
    undefined
  );

  const handleLoadData = useCallback(async () => {
    if (branch) {
      const val: BranchFormReqType = {
        id: branch._id,
        address: branch.address,
        name: branch.name,
        city: branch.city,
        description: branch.description,
      };
      setFormVal(val);
    }
  }, [branch]);

  useEffect(() => {
    handleLoadData();
  }, [handleLoadData]);

  const handleCallAPIs = async () => {
    const res1: StandardResp = await getBranchById(String(urlParam?.id));
    if (res1.success && res1.result) {
      setBranch(res1.result);
    }
  };

  useMount(() => {
    handleCallAPIs();
  });

  const handleSubmit = async (formikVal: BranchFormReqType) => {
    const newSupp = await editBranch(formikVal);
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

      await router.push(`${base_url}/admin/supplier`);
    }
  };

  const formikBag = useFormik<BranchFormReqType>({
    initialValues: formVal as BranchFormReqType,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: AddEditBranchSchema,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <div className="p-2 min-h-screen bg-white">
        {/* title */}
        <div className="flex justify-between p-2 border-2 border-gray-200 rounded-lg dark:border-gray-700">
          <HeaderModule title="Detail Branch" />
          <CustomBreadcrumb items={ReadItemBcItems} />
        </div>
        {/* body */}
        <div className="p-2 border-2 border-gray-200 rounded-lg dark:border-gray-700 mt-2">
          <FormikContext.Provider value={formikBag}>
            <BranchForm mode="READ" />
          </FormikContext.Provider>
        </div>
      </div>
    </>
  );
}
