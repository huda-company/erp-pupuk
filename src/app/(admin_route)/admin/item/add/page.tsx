"use client";

import { FormikContext, useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";

import convToOpts from "@/utils/convToOpts";
import { useAppDispatch } from "@/hooks";
import useMount from "@/hooks/useMount";

import { Option } from "@/components/Dropdown/types";
import HeaderModule from "@/components/Header/HeaderModule";

import { actions as utilsActions } from "@/redux/utils";

import { addItem } from "@/services/item/item";
import { getItemCategory } from "@/services/itemCategory/itemCategory";

import { StandardResp } from "@/app/api/types";

import ItemForm from "../components/ItemForm";
import { FE_ITEM_URL, initAddEditItemForm } from "../config";
import { ItemFormAPIReqType, ItemFormType } from "../types";
import AddEditSupplierSchema from "../validation";

export default function Page() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [itmCatOpts, setItmCatOpts] = useState<Option[]>([]);

  const handleCallAPIs = async () => {
    const { success: itmCatSuccess, result: itmCatRes }: StandardResp =
      await getItemCategory();
    if (itmCatSuccess) {
      const itmCatOpts: Option[] = await convToOpts(itmCatRes, "_id", "name");
      setItmCatOpts(itmCatOpts);
    }
  };

  useMount(() => {
    handleCallAPIs();
  });

  const handleSubmit = async (formikVal: ItemFormType) => {
    const params: ItemFormAPIReqType = {
      itemCategory: formikVal.itemCategoryOpt.id,
      name: formikVal.name,
      price: formikVal.price,
      description: formikVal.description,
    };
    const newSupp = await addItem(params);
    if (newSupp.success) {
      await dispatch(
        utilsActions.callShowToast({
          type: "success",
          title: "Sucessfully created",
          msg: "new item successfully created",
          timeout: 3000,
        })
      );

      await router.push(FE_ITEM_URL.LIST);
    }
  };

  const formikBag = useFormik<ItemFormType>({
    initialValues: initAddEditItemForm,
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
        <div className="p-3 border-2 border-gray-200 rounded-lg dark:border-gray-700">
          <HeaderModule title="Add Item" />
        </div>
        {/* body */}
        <div className="p-2 border-2 border-gray-200 rounded-lg dark:border-gray-700 mt-2 bg-gray-100 flex flex-col gap-6">
          <FormikContext.Provider value={formikBag}>
            <ItemForm itemCatOpts={itmCatOpts} mode="ADD" />
          </FormikContext.Provider>
        </div>
      </div>
    </>
  );
}
