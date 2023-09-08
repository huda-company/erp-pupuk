"use client";

import { StandardResp } from "@/app/api/types";
import { useState } from "react";
import { FormikContext, useFormik } from "formik";
import { ItemFormAPIReqType, ItemFormType } from "../types";
import { FE_ITEM_URL, initAddEditItemForm } from "../config";
import AddEditSupplierSchema from "../validation";
import { Typography } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/hooks";
import { actions as utilsActions } from "@/redux/utils";
import ItemForm from "../components/ItemForm";
import { addItem } from "@/services/item/item";
import { getItemCategory } from "@/services/itemCategory/itemCategory";
import convToOpts from "@/utils/convToOpts";
import { Option } from "@/components/Dropdown/types";
import useMount from "@/hooks/useMount";

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
          variation: "Secondary",
          msg: "success",
          icon: {
            src: "/svg/SuccessCheck.svg",
          },
          timeout: 4000,
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
      <div className="p-4 sm:ml-64 bg-white h-screen">
        <div className="p-4 border-2 border-gray-200 rounded-lg dark:border-gray-700 mt-11 flex flex-row">
          <div className="left-0 w-[50%]">
            <Typography className="text-[2rem] text-black font-bold underline float-left">
              Add Item
            </Typography>
          </div>
        </div>
        <div className="p-4 border-2 border-gray-200 rounded-lg dark:border-gray-700 mt-2 bg-gray-100 flex flex-col gap-6">
          <FormikContext.Provider value={formikBag}>
            <ItemForm itemCatOpts={itmCatOpts} mode="ADD" />
          </FormikContext.Provider>
        </div>
      </div>
    </>
  );
}
