"use client";

import { FormikContext, useFormik } from "formik";
import { useRouter } from "next/navigation";

import { useAppDispatch } from "@/hooks";

import CustomBreadcrumb from "@/components/CustomBreadcrumb";
import HeaderModule from "@/components/Header/HeaderModule";

import { actions as utilsActions } from "@/redux/utils";

import { addItemCategory } from "@/services/itemCategory/itemCategory";

import ItemCatForm from "../components/ItemCatForm";
import {
  AddItemBcItems,
  FE_ITEM_CAT_URL,
  initAddEditItemCatForm,
} from "../config";
import { ItemCatFormType } from "../types";
import AddEditSupplierSchema from "../validation";

export default function Page() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSubmit = async (formikVal: ItemCatFormType) => {
    const params: ItemCatFormType = {
      name: formikVal.name,
      description: formikVal.description,
    };
    const newSupp = await addItemCategory(params);
    if (newSupp.success) {
      await dispatch(
        utilsActions.callShowToast({
          type: "success",
          title: "Sucessfully created",
          msg: "new item category successfully created",
          timeout: 3000,
        })
      );

      await router.push(FE_ITEM_CAT_URL.LIST);
    }
  };

  const formikBag = useFormik<ItemCatFormType>({
    initialValues: initAddEditItemCatForm,
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
          <HeaderModule title="Add Item Category" />
          <CustomBreadcrumb items={AddItemBcItems} />
        </div>
        {/* body */}
        <div className="p-2 border-2 border-gray-200 rounded-lg dark:border-gray-700 mt-2 bg-gray-100 flex flex-col gap-6">
          <FormikContext.Provider value={formikBag}>
            <ItemCatForm mode="ADD" />
          </FormikContext.Provider>
        </div>
      </div>
    </>
  );
}
