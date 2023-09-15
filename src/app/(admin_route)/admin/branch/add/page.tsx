"use client";

import { FormikContext, useFormik } from "formik";
import { useRouter } from "next/navigation";

import { useAppDispatch } from "@/hooks";
import useMount from "@/hooks/useMount";

import Typography from "@/components/Typography";

import { actions as utilsActions } from "@/redux/utils";

import { addBranch } from "@/services/branch/branch";

import BranchForm from "../components/BranchForm";
import { FE_BRANCH_URL, initAddEditBranchForm } from "../config";
import { BranchFormReqType } from "../types";

export default function Page() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleCallAPIs = async () => {};

  useMount(() => {
    handleCallAPIs();
  });

  const handleSubmit = async (formikVal: BranchFormReqType) => {
    const params: BranchFormReqType = {
      name: formikVal.name,
      address: formikVal.address,
      city: formikVal.city,
      description: formikVal.description,
    };
    const newSupp = await addBranch(params);
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

      await router.push(FE_BRANCH_URL.LIST);
    }
  };

  const formikBag = useFormik<BranchFormReqType>({
    initialValues: initAddEditBranchForm,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
    // validationSchema: AddEditSupplierSchema,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <div className="p-4 sm:ml-64 bg-white h-screen">
        <div className="p-4 border-2 border-gray-200 rounded-lg dark:border-gray-700 mt-11 flex flex-row">
          <div className="left-0 w-[50%]">
            <Typography className="text-[2rem] text-black font-bold underline float-left">
              Add Branch
            </Typography>
          </div>
        </div>
        <div className="p-4 border-2 border-gray-200 rounded-lg dark:border-gray-700 mt-2 bg-gray-100 flex flex-col gap-6">
          <FormikContext.Provider value={formikBag}>
            <BranchForm mode="ADD" />
          </FormikContext.Provider>
        </div>
      </div>
    </>
  );
}
