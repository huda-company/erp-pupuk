"use client";
import { FieldArray, useFormikContext } from "formik";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { AiFillCloseCircle, AiFillPlusCircle } from "react-icons/ai";

import Button from "@/components/Button";
import { Variations } from "@/components/Dropdown/config";
import FormDropdown from "@/components/Formik/FormDropdown";
import FormInput from "@/components/Formik/FormInput";
import FormInputArea from "@/components/Formik/FormInputArea";
import Label from "@/components/Label";
import Typography from "@/components/Typography";
import ValidationMessage from "@/components/ValidationMessage";

import { initPurchItem } from "@/redux/purchase/data";
import { PurchaseState, PurchItemType } from "@/redux/purchase/models";

import { PURCH_PAYM_METH_OPTS } from "../config";
import { PurchaseFormProps } from "../types";

const PurchaseForm: FC<PurchaseFormProps> = ({
  mode,
  supplierOpts,
  itemOpts,
}) => {
  const router = useRouter();
  const { isSubmitting, submitForm, values } =
    useFormikContext<PurchaseState>();

  return (
    <>
      <div className="flex flex-row gap-4">
        {/* left side */}
        <div className="left-0 w-[65%] flex flex-col gap-y-4">
          <div className="pt-[0.5rem] flex flex-row w-full gap-4">
            <div className="w-[30%]">
              <Label
                containerStyle="bg-transparent"
                text="Year"
                textColor="text-imporable"
                textStyle="text-sm font-bold text-improbable"
                isRequired
              />
              <FormInput
                name="year"
                type="text"
                value={new Date().getFullYear()}
                readOnly
              />
              <ValidationMessage name="year" />
            </div>

            <div className="w-[30%]">
              <Label
                containerStyle="bg-transparent"
                text="Exp Date"
                textColor="text-imporable"
                textStyle="text-sm font-bold text-improbable"
                isRequired
              />
              <FormInput
                name="expDate"
                type="date"
                placeholder="Expired Date"
                readOnly={mode == "READ"}
              />
              <ValidationMessage name="expDate" />
            </div>

            <div className="w-[40%]">
              <Label
                containerStyle="bg-transparent"
                text="Payment Method"
                textColor="text-imporable"
                textStyle="text-sm font-bold text-improbable"
                isRequired
              />
              <FormDropdown
                emptyLabel="Select"
                name="purchPaymentMethodOpt"
                variation={Variations.Primary}
                width="w-full"
                options={PURCH_PAYM_METH_OPTS}
                readOnly={mode == "READ"}
              />
              <ValidationMessage name="purchPaymentMethodOpt" />
            </div>
          </div>

          {/* supplier field */}
          <div className="flex flex-row gap-4 w-full">
            <div className="w-[50%]">
              <Label
                containerStyle="bg-transparent"
                text="Supplier"
                textColor="text-imporable"
                textStyle="text-sm font-bold text-improbable"
                isRequired
              />
              <FormDropdown
                emptyLabel="Select Supplier"
                name="supplierOpt"
                variation={Variations.Primary}
                width="w-full"
                className="mt-[0.3rem]"
                options={supplierOpts}
                readOnly={mode == "READ"}
              />
              <ValidationMessage name="supplierOpt" />
            </div>
            <div className="w-[50%] pt-[0.7rem]">
              <Label
                containerStyle="bg-transparent"
                text="Billing Code"
                textColor="text-imporable"
                textStyle="text-sm font-bold text-improbable"
              />
              <FormInput
                name="billingCode"
                type="text"
                placeholder="Billing Code"
                readOnly={mode == "READ"}
              />
              <ValidationMessage name="supplierOpt" />
            </div>
          </div>

          {/* note field */}
          <div>
            <Label
              containerStyle="bg-transparent"
              text="Note"
              textColor="text-imporable"
              textStyle="text-sm font-bold text-improbable"
            />
            <FormInputArea
              name="note"
              placeholder="Note"
              readOnly={mode == "READ"}
            />
            <ValidationMessage name="note" />
          </div>
        </div>
        {/* right side */}
        <div className="right-0 w-[35%] items-end">
          <div className="mt-[0rem] flex w-[23.313rem] float-right">
            {mode != "READ" && (
              <>
                <div className="">
                  <Button
                    size="xs"
                    className="bg-red-400"
                    onClick={() => router.back()}
                  >
                    <Typography className="font-bold text-base">
                      Cancel
                    </Typography>
                  </Button>
                </div>
                <div className="ml-[0.818rem] ">
                  <Button
                    className="bg-green-400"
                    variant="primary"
                    size="xs"
                    onClick={submitForm}
                    isLoading={isSubmitting}
                  >
                    <Typography color="white" className="font-bold text-base">
                      Save
                    </Typography>
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="w-full px-4 py-5 border-2 border-gray-300 rounded-lg dark:border-gray-700">
        <FieldArray name="items">
          {({ remove, push }) => (
            <>
              <div className="">
                <div className="w-[50%] cursor-pointer">
                  <AiFillPlusCircle
                    onClick={() => push(initPurchItem)}
                    size={32}
                    color="green"
                  />
                </div>
                {values.items.length > 0 &&
                  values.items.map((item: PurchItemType, index) => (
                    <div className="mt-[2rem] flex flex-row gap-4 " key={index}>
                      <div className="col cursor-pointer flex justify-center items-center">
                        <AiFillCloseCircle
                          color="red"
                          size={32}
                          onClick={() => remove(index)}
                        />
                      </div>

                      <div className="flex flex-col gap-1.5 w-[50%]">
                        <Label
                          containerStyle="bg-transparent"
                          text="Item"
                          textColor="text-imporable"
                          textStyle="text-sm font-bold text-improbable"
                        />
                        <FormDropdown
                          emptyLabel="Item"
                          name={`items.${index}.itemOpt`}
                          variation={Variations.Primary}
                          width="w-full"
                          className="mt-[0.3rem]"
                          options={itemOpts}
                          readOnly={mode == "READ"}
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <Label
                          containerStyle="bg-transparent"
                          text="Qty"
                          textColor="text-imporable"
                          textStyle="text-sm font-bold text-improbable"
                        />
                        <FormInput
                          name={`items.${index}.qty`}
                          onFocus={(e) => e.target.select()}
                          value={values.items[index].qty}
                          type="number"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <Label
                          containerStyle="bg-transparent"
                          text="Price"
                          textColor="text-imporable"
                          textStyle="text-sm font-bold text-improbable"
                        />
                        <FormInput
                          name={`items.${index}.price`}
                          onFocus={(e) => e.target.select()}
                          type="number"
                          readOnly={mode == "READ"}
                          value={values.items[index].price}
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <Label
                          containerStyle="bg-transparent"
                          text="Discount"
                          textColor="text-imporable"
                          textStyle="text-sm font-bold text-improbable"
                        />
                        <FormInput
                          name={`items.${index}.discount`}
                          onFocus={(e) => e.target.select()}
                          type="number"
                          readOnly={mode == "READ"}
                          value={values.items[index].discount}
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <Label
                          containerStyle="bg-transparent"
                          text="Total"
                          textColor="text-imporable"
                          textStyle="text-sm font-bold text-improbable"
                        />
                        <input
                          className="h-[3.6rem] rounded-xl pl-4"
                          placeholder={(
                            Number(values.items[index].qty) *
                              Number(values.items[index].price) -
                            Number(values.items[index].discount)
                          ).toString()}
                          name={`items.${index}.itemTotal`}
                          value={(
                            Number(values.items[index].qty) *
                              Number(values.items[index].price) -
                            Number(values.items[index].discount)
                          ).toString()}
                          readOnly
                        />
                      </div>
                    </div>
                  ))}
              </div>
              {/* <Typography size="text-lg" color="red" className="mt-[2rem]">
                Payment Summary
              </Typography>
              <div className="flex flex-row">
                <div className="left-0 w-[50%]">Sub total</div>
                <div className="right-0 w-[50%]">
                  {
                  values.items.reduce((accumulator, currentItem) => {
                    return accumulator + currentItem.itemTotal;
                  }, 0)
                  }
                </div>
              </div> */}
            </>
          )}
        </FieldArray>
      </div>
    </>
  );
};

export default PurchaseForm;
