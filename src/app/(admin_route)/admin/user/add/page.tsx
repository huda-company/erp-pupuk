"use client";

import { FormikContext, useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";

import convToOpts from "@/utils/convToOpts";
import { useAppDispatch } from "@/hooks";
import useMount from "@/hooks/useMount";

import CustomBreadcrumb from "@/components/CustomBreadcrumb";
import { Option } from "@/components/Dropdown/types";
import HeaderModule from "@/components/Header/HeaderModule";

import { actions as utilsActions } from "@/redux/utils";

import { getRoles } from "@/services/role/role";
import { addUser } from "@/services/user/user";

import { StandardResp } from "@/app/api/types";

import UserForm from "../components/UserForm";
import { AddItemBcItems, FE_USER_URL, initAddEditItemForm } from "../config";
import { UserFormAPIReqType, UserFormType } from "../types";
import { AddUserSchema } from "../validation";

export default function Page() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [roleOpts, setRoleOpts] = useState<Option[]>([]);

  const handleCallAPIs = async () => {
    const { success: itmCatSuccess, result: itmCatRes }: StandardResp =
      await getRoles();
    if (itmCatSuccess) {
      const roleOpts: Option[] = await convToOpts(
        itmCatRes,
        "_id",
        "displayName"
      );
      setRoleOpts(roleOpts);
    }
  };

  useMount(() => {
    handleCallAPIs();
  });

  const handleSubmit = async (formikVal: UserFormType) => {
    const params: UserFormAPIReqType = {
      role: formikVal.roleOpt.id,
      name: formikVal.name,
      surname: formikVal.name,
      email: formikVal.email,
      password: formikVal.password,
    };

    const newSupp = await addUser(params);
    if (newSupp.success) {
      await dispatch(
        utilsActions.callShowToast({
          type: "success",
          title: "Sucessfully created",
          msg: "new user successfully created",
          timeout: 3000,
        })
      );

      await router.push(FE_USER_URL.LIST);
    }
  };

  const formikBag = useFormik<UserFormType>({
    initialValues: initAddEditItemForm,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: AddUserSchema,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <div className="p-2 bg-white min-h-screen">
        {/* title */}
        <div className="flex justify-between p-2 border-2 border-gray-200 rounded-lg dark:border-gray-700">
          <HeaderModule title="Add User" />
          <CustomBreadcrumb items={AddItemBcItems} />
        </div>
        {/* body */}
        <div className="p-2 border-2 border-gray-200 rounded-lg dark:border-gray-700 mt-2 bg-gray-100 flex flex-col gap-6">
          <FormikContext.Provider value={formikBag}>
            <UserForm roleOpts={roleOpts} mode="ADD" />
          </FormikContext.Provider>
        </div>
      </div>
    </>
  );
}
