"use client";

import { FormikContext, useFormik } from "formik";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import convToOpts from "@/utils/convToOpts";
import { useAppDispatch } from "@/hooks";
import useMount from "@/hooks/useMount";

import { base_url } from "@/constants/env";

import CustomBreadcrumb from "@/components/CustomBreadcrumb";
import { Option } from "@/components/Dropdown/types";
import HeaderModule from "@/components/Header/HeaderModule";

import { actions as utilsActions } from "@/redux/utils";

import { getRoles } from "@/services/role/role";
import { APIUserResp } from "@/services/user/types";
import { editUser, getUserById } from "@/services/user/user";

import { StandardResp } from "@/app/api/types";

import ItemForm from "../../components/UserForm";
import { ReadItemBcItems } from "../../config";
import { UserFormAPIReqType, UserFormType } from "../../types";

export default function Page() {
  const urlParam = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [itm, setItm] = useState<APIUserResp | undefined>(undefined);
  const [itmCatOpts, setItmCatOpts] = useState<Option[]>([]);

  const [formVal, setFormVal] = useState<UserFormType | undefined>(undefined);

  const setInitFormVal = useCallback(() => {
    if (itm) {
      const val: UserFormType = {
        _id: itm._id,
        roleOpt: itmCatOpts.find((x) => x.id == itm?.role) as Option,
        name: itm.name,
        email: String(itm.email),
      };
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

  const handleSubmit = async (formVal: UserFormType) => {
    const params: UserFormAPIReqType = {
      _id: formVal?._id,
      role: formVal?.roleOpt.id,
      name: String(formVal?.name),
      email: String(formVal?.email),
    };

    const newSupp = await editUser(params);
    if (newSupp.success) {
      await dispatch(
        utilsActions.callShowToast({
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

  const formikBag = useFormik<UserFormType>({
    initialValues: formVal as UserFormType,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <div className="p-2 bg-white min-h-screen">
        {/* title */}
        <div className="flex justify-between p-2 border-2 border-gray-200 rounded-lg dark:border-gray-700">
          <HeaderModule title="Detail User" />
          <CustomBreadcrumb items={ReadItemBcItems} />
        </div>
        {/* body */}
        <div className="p-2 border-2 border-gray-200 rounded-lg dark:border-gray-700 mt-2 bg-gray-100 flex flex-col gap-6">
          <FormikContext.Provider value={formikBag}>
            <ItemForm roleOpts={itmCatOpts} mode="READ" />
          </FormikContext.Provider>
        </div>
      </div>
    </>
  );
}
