"use client";

import { FormikContext, useFormik } from "formik";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import convToOpts from "@/utils/convToOpts";

import { Option } from "@/components/Dropdown/types";
import HeaderModule from "@/components/Header/HeaderModule";
import Popup from "@/components/Popup/Popup";
import Typography from "@/components/Typography";

import { initialState } from "@/redux/purchase/data";
import { PurchaseState, PurchItemType } from "@/redux/purchase/models";

import { getItems } from "@/services/item/item";
import { addPurchase, getPurchaseById } from "@/services/purchase/purchase";
import { APIPurchaseReq, APIPurchaseResp } from "@/services/purchase/types";
import { getSuppliers } from "@/services/supplier/supplier";

import { StandardResp } from "@/app/api/types";

import convItemFEtoReq from "../../_utils/convItemFEtoReq";
import PurchaseForm from "../../components/PurchaseForm";
import { FE_PURCHASING_URL, PURCH_PAYM_METH_OPTS } from "../../config";
import { emptyOption } from "../../../item/types";

export default function Page() {
  const urlParam = useParams();

  const router = useRouter();

  const [suppliers, setSuppliers] = useState<Option[]>([]);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMsg, setAlertMsg] = useState<string>("");
  const [items, setItems] = useState<Option[]>([]);
  const [firstInitPurcForm, setFirstInitPurchForm] =
    useState<PurchaseState>(initialState);
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
      await setSuppliers(mappedSuppOpts);
    }

    const itemRes: StandardResp = await getItems();
    if (itemRes.success && itemRes.result) {
      const mappedSuppOpts: Option[] = convToOpts(
        itemRes.result,
        "_id",
        "name"
      );
      await setItems(mappedSuppOpts);
    }
  }, []);

  const handleInitFormik = useCallback(async () => {
    const purchaseRes: StandardResp = await getPurchaseById(
      String(urlParam?.id)
    );
    const poRes: APIPurchaseResp = purchaseRes.result;
    if (purchaseRes.success && purchaseRes.result) {
      const mappedItm: PurchItemType[] = poRes.items.map((x) => {
        return {
          itemOpt: items.find((y) => y.id == x.item._id) ?? emptyOption,
          discount: x.discount,
          price: x.price,
          itemTotal: x.total,
          qty: x.quantity,
        };
      });
      const firstInit: PurchaseState = {
        _id: poRes._id,
        items: mappedItm,

        billingCode: poRes.billingCode,
        subTotal: poRes.subTotal,
        taxTotal: poRes.taxTotal,
        grandTotal: poRes.grandTotal,
        note: poRes.note,
        expDate: poRes.expDate.toString(),
        discount: poRes.discount,
        year: poRes.year,
        purchPaymentMethodOpt:
          PURCH_PAYM_METH_OPTS.find((x) => x.id == poRes.purchPaymentMethod) ??
          emptyOption,
        supplierOpt:
          suppliers.find((x) => x.id == poRes.supplier._id) ?? emptyOption,
      };
      setFirstInitPurchForm(firstInit);
    }
  }, [items, suppliers, urlParam?.id]);

  useEffect(() => {
    handleLoadData();
  }, [handleLoadData]);

  useEffect(() => {
    handleInitFormik();
  }, [handleInitFormik]);

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
        billingCode: formikVal.billingCode,
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
        note: String(formikVal.status),
        grandTotal: 0,
      };
      const createPurch = await addPurchase(params);
      if (createPurch.success) {
        await router.push(
          `${FE_PURCHASING_URL.READ}/${createPurch.result._id}`
        );
      }
    } else {
      console.log("item not valid");
    }
  };

  const formikBag = useFormik<PurchaseState>({
    initialValues: firstInitPurcForm,
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
        {/* title */}
        <div className="p-3 border-2 border-gray-200 rounded-lg dark:border-gray-700 mt-11">
          <HeaderModule title="Edit Purchase Order" />
        </div>
        {/* body */}
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
