"use client";

import { FormikContext, useFormik } from "formik";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { useAppDispatch } from "@/hooks";
import useMount from "@/hooks/useMount";

import Typography from "@/components/Typography";

import { actions as utilsActions } from "@/redux/utils";

import { editBranch, getBranchById } from "@/services/branch/branch";
import { APIBranchResp } from "@/services/branch/types";

import { StandardResp } from "@/app/api/types";

import BranchForm from "../../components/BranchForm";
import { FE_BRANCH_URL } from "../../config";
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
        id: branch._id || "",
        address: branch.address || "",
        name: branch.name || "",
        city: branch.city || "",
        description: branch.description || "",
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

      await router.push(`${FE_BRANCH_URL.READ}/${formikVal.id}`);
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
      <div className="p-4 sm:ml-64 bg-white h-screen">
        <div className="p-4 border-2 border-gray-200 rounded-lg dark:border-gray-700 mt-11">
          <Typography className="text-xl text-black font-bold underline">
            Edit Branch
          </Typography>
        </div>
        <div className="p-4 border-2 border-gray-200 rounded-lg dark:border-gray-700 mt-2 bg-gray-100 flex flex-col gap-6">
          <FormikContext.Provider value={formikBag}>
            <BranchForm mode="EDIT" />
          </FormikContext.Provider>
        </div>
      </div>
    </>
  );
}
