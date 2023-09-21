"use client";

import { FormikContext, useFormik } from "formik";
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

import { getRoles } from "@/services/role/role";
import { APIUserResp } from "@/services/user/types";
import { editUser, getUserById } from "@/services/user/user";

import { StandardResp } from "@/app/api/types";

import UserForm from "../../components/UserForm";
import { EditItemBcItems, FE_USER_URL } from "../../config";
import { UserFormAPIReqType, UserFormType } from "../../types";
import { EditUserSchema } from "../../validation";

export default function Page() {
  const urlParam = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [itm, setItm] = useState<APIUserResp | undefined>(undefined);
  const [formVal, setFormVal] = useState<UserFormType | undefined>(undefined);
  const [itmCatOpts, setItmCatOpts] = useState<Option[]>([]);

  const setInitFormVal = useCallback(() => {
    if (itm) {
      const val: UserFormType = {
        _id: itm._id,
        roleOpt: itmCatOpts.find((x) => x.id == itm?.role) as Option,
        name: itm.name,
        email: String(itm.email),
      };
      console.log("itm", itm);
      console.log("val", val);
      setFormVal(val);
    }
  }, [itm, itmCatOpts]);

  useEffect(() => {
    setInitFormVal();
  }, [setInitFormVal]);

  const handleCallAPIs = async () => {
    const { success: itmCatSuccess, result: itmCatRes }: StandardResp =
      await getRoles();
    if (itmCatSuccess) {
      const itmCatOpts: Option[] = await convToOpts(
        itmCatRes,
        "_id",
        "displayName"
      );
      setItmCatOpts(itmCatOpts);
    }

    const res1: StandardResp = await getUserById(String(urlParam?.id));
    if (res1.success && res1.result) {
      setItm(res1.result);
    }
  };

  useMount(() => {
    handleCallAPIs();
  });

  const handleSubmit = async (formikVal: UserFormType) => {
    const params: UserFormAPIReqType = {
      _id: formikVal?._id,
      role: formikVal?.roleOpt.id,
      name: String(formikVal?.name),
      email: String(formikVal?.email),
    };

    const newSupp = await editUser(params);
    if (newSupp.success) {
      await dispatch(
        utilsActions.callShowToast({
          type: "success",
          msg: "item udpated successfully",
          timeout: 3000,
        })
      );

      await router.push(`${FE_USER_URL.READ}/${formikVal._id}`);
    }
  };

  const formikBag = useFormik<UserFormType>({
    initialValues: formVal as UserFormType,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: EditUserSchema,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <div className="p-2 bg-white min-h-screen">
        {/* title */}
        <div className="flex justify-between p-2 border-2 border-gray-200 rounded-lg dark:border-gray-700">
          <HeaderModule title="Edit User" />
          <CustomBreadcrumb items={EditItemBcItems} />
        </div>
        {/* body */}
        <div className="p-2 border-2 border-gray-200 rounded-lg dark:border-gray-700 mt-2 bg-gray-100 flex flex-col gap-6">
          <FormikContext.Provider value={formikBag}>
            <UserForm roleOpts={itmCatOpts} mode="EDIT" />
          </FormikContext.Provider>
        </div>
      </div>
    </>
  );
}
