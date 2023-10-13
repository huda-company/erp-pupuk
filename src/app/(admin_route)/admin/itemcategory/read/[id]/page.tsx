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

import { APIItemResp } from "@/services/item/types";
import {
  editItemCategory,
  getItemCategory,
  getItemCategoryById,
} from "@/services/itemCategory/itemCategory";

import { StandardResp } from "@/app/api/types";

import ItemForm from "../../components/ItemCatForm";
import { ReadItemBcItems } from "../../config";
import { ItemCatFormType } from "../../types";
import AddEditSupplierSchema from "../../validation";

export default function Page() {
  const urlParam = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [itm, setItm] = useState<APIItemResp | undefined>(undefined);
  const [itmCatOpts, setItmCatOpts] = useState<Option[]>([]);

  const [formVal, setFormVal] = useState<ItemCatFormType | undefined>(
    undefined
  );

  const setInitFormVal = useCallback(() => {
    if (itm) {
      const val: ItemCatFormType = {
        _id: itm._id,
        name: itm.name,
        description: itm.description,
      };
      setFormVal(val);
    }
  }, [itm]);

  useEffect(() => {
    setInitFormVal();
  }, [setInitFormVal]);

  const handleCallAPIs = async () => {
    const { success: itmCatSuccess, result: itmCatRes }: StandardResp =
      await getItemCategory();
    if (itmCatSuccess) {
      const itmCatOpts: Option[] = await convToOpts(itmCatRes, "_id", "name");
      setItmCatOpts(itmCatOpts);
    }

    const res1: StandardResp = await getItemCategoryById(String(urlParam?.id));
    if (res1.success && res1.result) {
      setItm(res1.result);
    }
  };

  useMount(() => {
    handleCallAPIs();
  });

  const handleSubmit = async (formVal: ItemCatFormType) => {
    const params: ItemCatFormType = {
      _id: formVal?._id,
      name: String(formVal?.name),
      description: String(formVal?.description),
    };

    const newSupp = await editItemCategory(params);
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

  const formikBag = useFormik<ItemCatFormType>({
    initialValues: formVal as ItemCatFormType,
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
        <div className="flex justify-between p-2 border-2 border-gray-200 rounded-lg dark:border-gray-700">
          <HeaderModule title="Detail Item Category" />
          <CustomBreadcrumb items={ReadItemBcItems} />
        </div>
        {/* body */}
        <div className="p-2 border-2 border-gray-200 rounded-lg dark:border-gray-700 mt-2 bg-gray-100 flex flex-col gap-6">
          <FormikContext.Provider value={formikBag}>
            <ItemForm mode="READ" />
          </FormikContext.Provider>
        </div>
      </div>
    </>
  );
}
