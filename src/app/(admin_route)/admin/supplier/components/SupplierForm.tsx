"use client";
import { useFormikContext } from "formik";
import { useRouter } from "next/navigation";
import { FC } from "react";

import Button from "@/components/Button";
import FormInput from "@/components/Formik/FormInput";
import FormInputArea from "@/components/Formik/FormInputArea";
import ValidationMessage from "@/components/Formik/ValidationMessage";
import Label from "@/components/Label";
import Typography from "@/components/Typography";

import { SupplierFormProps, SupplierFormType } from "../types";

const SupplierForm: FC<SupplierFormProps> = ({ mode }) => {
  const router = useRouter();

  const { isSubmitting, submitForm } = useFormikContext<SupplierFormType>();
  return (
    <>
      <div className="w-[50%]">
        <Label
          containerStyle="bg-transparent"
          text="Supplier Name"
          textColor="text-imporable"
          textStyle="text-sm font-bold text-improbable"
          isRequired
        />
        <FormInput
          name="company"
          type="text"
          placeholder="Supplier Name"
          readOnly={mode == "READ"}
        />
        <ValidationMessage name="company" />
      </div>

      <div className="w-[50%]">
        <Label
          containerStyle="bg-transparent"
          text="Manager Name"
          textColor="text-imporable"
          textStyle="text-sm font-bold text-improbable"
          isRequired
        />
        <FormInput
          name="managerName"
          type="text"
          placeholder="Manager Name"
          readOnly={mode == "READ"}
        />
        <ValidationMessage name="managerName" />
      </div>

      <div className="w-[50%]">
        <Label
          containerStyle="bg-transparent"
          text="Manager SurName"
          textColor="text-imporable"
          textStyle="text-sm font-bold text-improbable"
          isRequired
        />
        <FormInput
          name="managerSurname"
          type="text"
          placeholder="Manager SurName"
          readOnly={mode == "READ"}
        />
        <ValidationMessage name="managerSurname" />
      </div>

      <div className="w-[50%]">
        <Label
          containerStyle="bg-transparent"
          text="Email"
          textColor="text-imporable"
          textStyle="text-sm font-bold text-improbable"
          isRequired
        />
        <FormInput
          name="email"
          type="email"
          placeholder="Email"
          readOnly={mode == "READ"}
        />
        <ValidationMessage name="email" />
      </div>

      <div className="w-[50%]">
        <Label
          containerStyle="bg-transparent"
          text="Bank Account"
          textColor="text-imporable"
          textStyle="text-sm font-bold text-improbable"
          isRequired
        />
        <FormInput
          name="bankAccount"
          type="text"
          placeholder="Bank Account"
          readOnly={mode == "READ"}
        />
        <ValidationMessage name="bankAccount" />
      </div>

      <div className="w-[50%]">
        <Label
          containerStyle="bg-transparent"
          text="Phone"
          textColor="text-imporable"
          textStyle="text-sm font-bold text-improbable"
          isRequired
        />
        <FormInput
          name="tel"
          type="text"
          placeholder="Phone"
          readOnly={mode == "READ"}
        />
        <ValidationMessage name="tel" />
      </div>

      <div className="w-[50%]">
        <Label
          containerStyle="bg-transparent"
          text="Address"
          textColor="text-imporable"
          textStyle="text-sm font-bold text-improbable"
          isRequired
        />
        <FormInputArea
          name="address"
          placeholder="Address"
          readOnly={mode == "READ"}
        />
        <ValidationMessage name="address" />
      </div>

      <div className="mt-[0rem] flex w-[23.313rem]">
        {mode != "READ" && (
          <>
            <div className="w-[50%]">
              <Button
                size="sm"
                className="bg-red-400"
                onClick={() => router.back()}
              >
                <Typography className="font-bold text-base">Cancel</Typography>
              </Button>
            </div>
            <div className="ml-[0.818rem] w-[50%]">
              <Button
                className="bg-green-400"
                variant="primary"
                size="sm"
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
    </>
  );
};

export default SupplierForm;
