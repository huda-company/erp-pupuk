"use client";

import { StandardResp } from "@/app/api/types";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { FormikContext, useFormik } from "formik";
import { ItemFormAPIReqType, ItemFormType } from "../../types";
import { actions as utilsActions } from "@/redux/utils";
import useMount from "@/hooks/useMount";
import { useAppDispatch } from "@/hooks";
import { useRouter } from "next/navigation";
import { FE_ITEM_URL } from "../../config";
import ItemForm from "../../components/ItemForm";
import { editItem, getItemById } from "@/services/item/item";
import { APIItemResp } from "@/services/item/types";
import { getItemCategory } from "@/services/itemCategory/itemCategory";
import { Option } from "@/components/Dropdown/types";
import convToOpts from "@/utils/convToOpts";
import AddEditItemSchema from "../../validation";
import Typography from "@/components/Typography";

export default function Page() {
  const urlParam = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [itm, setItm] = useState<APIItemResp | undefined>(undefined);
  const [formVal, setFormVal] = useState<ItemFormType | undefined>(undefined);
  const [itmCatOpts, setItmCatOpts] = useState<Option[]>([]);

  const setInitFormVal = useCallback(() => {
    if (itm) {
      const val: ItemFormType = {
        id: itm._id,
        itemCategoryOpt: itmCatOpts.find(
          (x) => x.id == itm?.itemCategory
        ) as Option,
        name: itm.name,
        price: String(itm.price),
        description: itm.description,
      };
      setFormVal(val);
    }
  }, [itm, itmCatOpts]);

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

    const res1: StandardResp = await getItemById(String(urlParam?.id));
    if (res1.success && res1.result) {
      setItm(res1.result);
    }
  };

  useMount(() => {
    handleCallAPIs();
  });

  const handleSubmit = async (formikVal: ItemFormType) => {
    const params: ItemFormAPIReqType = {
      id: formikVal?.id,
      itemCategory: formikVal?.itemCategoryOpt.id,
      name: String(formikVal?.name),
      price: String(formikVal?.price),
      description: String(formikVal?.description),
    };

    const newSupp = await editItem(params);
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

      await router.push(`${FE_ITEM_URL.READ}/${formikVal.id}`);
    }
  };

  const formikBag = useFormik<ItemFormType>({
    initialValues: formVal as ItemFormType,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: AddEditItemSchema,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <div className="p-4 sm:ml-64 bg-white h-screen">
        <div className="p-4 border-2 border-gray-200 rounded-lg dark:border-gray-700 mt-11">
          <Typography className="text-xl text-black font-bold underline">
            Edit Item
          </Typography>
        </div>
        <div className="p-4 border-2 border-gray-200 rounded-lg dark:border-gray-700 mt-2 bg-gray-100 flex flex-col gap-6">
          <FormikContext.Provider value={formikBag}>
            <ItemForm itemCatOpts={itmCatOpts} mode="EDIT" />
          </FormikContext.Provider>
        </div>
      </div>
    </>
  );
}
