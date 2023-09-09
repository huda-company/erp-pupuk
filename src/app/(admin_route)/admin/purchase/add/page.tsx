"use client";

import { FormikContext, useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import convToOpts from "@/utils/convToOpts";

import { Option } from "@/components/Dropdown/types";
import HeaderModule from "@/components/Header/HeaderModule";
import Popup from "@/components/Popup/Popup";
import Typography from "@/components/Typography";

import { initialState } from "@/redux/purchase/data";
import { PurchaseState } from "@/redux/purchase/models";

import { getItems } from "@/services/item/item";
import { addPurchase } from "@/services/purchase/purchase";
import { APIPurchaseReq } from "@/services/purchase/types";
import { getSuppliers } from "@/services/supplier/supplier";

import { StandardResp } from "@/app/api/types";

import convItemFEtoReq from "../_utils/convItemFEtoReq";
import PurchaseForm from "../components/PurchaseForm";
import { FE_PURCHASING_URL } from "../config";

export default function Page() {
  const router = useRouter();

  const [suppliers, setSuppliers] = useState<Option[]>([]);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMsg, setAlertMsg] = useState<string>("");
  const [items, setItems] = useState<Option[]>([]);
  const [initPurcForm, setInitPurchForm] =
    useState<PurchaseState>(initialState);

  const AreUsure = (
    <Typography className="text-2xl text-black align-center ml-[1rem]">
      {alertMsg}
    </Typography>
  );

  const handleLoadData = useCallback(async () => {
    const suppRes: StandardResp = await getSuppliers();
    if (suppRes.success && suppRes.result) {
      const mappedSuppOpts: Option[] = convToOpts(
        suppRes.result,
        "_id",
        "company"
      );
      setSuppliers(mappedSuppOpts);
    }

    const itemRes: StandardResp = await getItems();
    if (itemRes.success && itemRes.result) {
      const mappedSuppOpts: Option[] = convToOpts(
        itemRes.result,
        "_id",
        "name"
      );
      setItems(mappedSuppOpts);
    }
  }, []);

  useEffect(() => {
    handleLoadData();
  }, [handleLoadData]);

  const handleSubmit = async (formikVal: PurchaseState) => {
    const isFormValid = true;

    const { items } = formikVal;
    if (items.length == 1 && items[0].itemOpt.id == "") {
      setAlertMsg("item cannot empty");
      setShowAlert(true);
    }

    const convItms: any = await convItemFEtoReq(formikVal.items);
    if (isFormValid) {
      const params: APIPurchaseReq = {
        items: convItms.items,
        year: formikVal.year,
        expDate: formikVal.expDate,
        supplier: formikVal.supplierOpt.id,
        ppnIncluded: false,
        subTotal: 0,
        taxRate: 0,
        taxTotal: 0,
        credit: 0,
        discount: 0,
        paymentStatus: "",
        purchPaymentMethod: formikVal?.purchPaymentMethodOpt?.id,
        note: formikVal.status,
        grandTotal: 0,
        status: "",
      };
      const createPurch = await addPurchase(params);
      if (createPurch.success) {
        console.log("aaaa", createPurch);

        await router.push(FE_PURCHASING_URL.LIST);
      }
    } else {
      console.log("item not valid");
    }
  };

  const formikBag = useFormik<PurchaseState>({
    initialValues: initialState,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
    // validationSchema: AddEditPurchaseSchema,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    setInitPurchForm(formikBag.values);
  }, [formikBag.values]);

  return (
    <>
      <Popup
        variation="Six"
        msg3={AreUsure}
        show={showAlert}
        onClose={() => setShowAlert(false)}
      />
      <div className="p-4 sm:ml-64 bg-white h-screen">
        <div className="p-4 border-2 border-gray-200 rounded-lg dark:border-gray-700 mt-11 flex flex-row">
          <div className="left-0 w-[50%] pt-[1rem]">
            <HeaderModule title="Add Purchase Order" />
          </div>
        </div>
        <div className="p-4 border-2 border-gray-200 rounded-lg dark:border-gray-700 mt-2 bg-gray-100 flex flex-col gap-6">
          <FormikContext.Provider value={formikBag}>
            <PurchaseForm
              updatedFormikVal={initPurcForm}
              itemOpts={items}
              supplierOpts={suppliers}
              mode="ADD"
            />
          </FormikContext.Provider>
        </div>
      </div>
    </>
  );
}
