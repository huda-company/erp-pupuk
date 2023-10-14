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

import { APIItemResp } from "@/services/item/types";
import {
  editItemCategory,
  getItemCategoryById,
} from "@/services/itemCategory/itemCategory";

import { StandardResp } from "@/app/api/types";

import ItemCatForm from "../../components/ItemCatForm";
import { EditItemBcItems, FE_ITEM_CAT_URL } from "../../config";
import { ItemCatFormType } from "../../types";
import AddEditItemSchema from "../../validation";

export default function Page() {
  const urlParam = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [itm, setItm] = useState<APIItemResp | undefined>(undefined);
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
    const res1: StandardResp = await getItemCategoryById(String(urlParam?.id));
    if (res1.success && res1.result) {
      setItm(res1.result);
    }
  };

  useMount(() => {
    handleCallAPIs();
  });

  const handleSubmit = async (formikVal: ItemCatFormType) => {
    const params: ItemCatFormType = {
      _id: formikVal?._id,
      name: String(formikVal?.name),
      description: String(formikVal?.description),
    };

    const newSupp = await editItemCategory(params);
    if (newSupp.success) {
      await dispatch(
        utilsActions.callShowToast({
          type: "success",
          msg: "item category udpated successfully",
          timeout: 3000,
        })
      );

      await router.push(`${FE_ITEM_CAT_URL.READ}/${formikVal._id}`);
    }
  };

  const formikBag = useFormik<ItemCatFormType>({
    initialValues: formVal as ItemCatFormType,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: AddEditItemSchema,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <div className="p-2 bg-white min-h-screen">
        {/* title */}
        <div className="flex justify-between p-2 border-2 border-gray-200 rounded-lg dark:border-gray-700">
          <HeaderModule title="Edit Item Category" />
          <CustomBreadcrumb items={EditItemBcItems} />
        </div>
        {/* body */}
        <div className="p-2 border-2 border-gray-200 rounded-lg dark:border-gray-700 mt-2 bg-gray-100 flex flex-col gap-6">
          <FormikContext.Provider value={formikBag}>
            <ItemCatForm mode="EDIT" />
          </FormikContext.Provider>
        </div>
      </div>
    </>
  );
}
