"use client";

import { FormikContext, useFormik } from "formik";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import convToOpts from "@/utils/convToOpts";
import { useAppDispatch } from "@/hooks";
import useMount from "@/hooks/useMount";

import { base_url } from "@/constants/env";

import { Option } from "@/components/Dropdown/types";
import HeaderModule from "@/components/Header/HeaderModule";

import { actions as utilsActions } from "@/redux/utils";

import { editItem, getItemById } from "@/services/item/item";
import { APIItemResp } from "@/services/item/types";
import { getItemCategory } from "@/services/itemCategory/itemCategory";

import { StandardResp } from "@/app/api/types";

import ItemForm from "../../components/ItemForm";
import { ItemFormAPIReqType, ItemFormType } from "../../types";
import AddEditSupplierSchema from "../../validation";

export default function Page() {
  const urlParam = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [itm, setItm] = useState<APIItemResp | undefined>(undefined);
  const [itmCatOpts, setItmCatOpts] = useState<Option[]>([]);

  const [formVal, setFormVal] = useState<ItemFormType | undefined>(undefined);

  const setInitFormVal = useCallback(() => {
    if (itm) {
      const val: ItemFormType = {
        _id: itm._id,
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

  const handleSubmit = async (formVal: ItemFormType) => {
    const params: ItemFormAPIReqType = {
      _id: formVal?._id,
      itemCategory: formVal?.itemCategoryOpt.id,
      name: String(formVal?.name),
      price: String(formVal?.price),
      description: String(formVal?.description),
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

      await router.push(`${base_url}/admin/supplier`);
    }
  };

  const formikBag = useFormik<ItemFormType>({
    initialValues: formVal as ItemFormType,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: AddEditSupplierSchema,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <div className="p-4 sm:ml-64 bg-white h-screen">
        {/* title */}
        <div className="p-3 border-2 border-gray-200 rounded-lg dark:border-gray-700 mt-11">
          <HeaderModule title="Detail Item" />
        </div>
        {/* body */}
        <div className="p-4 border-2 border-gray-200 rounded-lg dark:border-gray-700 mt-2 bg-gray-100 flex flex-col gap-6">
          <FormikContext.Provider value={formikBag}>
            <ItemForm itemCatOpts={itmCatOpts} mode="READ" />
          </FormikContext.Provider>
        </div>
      </div>
    </>
  );
}
