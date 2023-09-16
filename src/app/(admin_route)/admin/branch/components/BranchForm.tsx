"use client";
import { useFormikContext } from "formik";
import { useRouter } from "next/navigation";
import { FC } from "react";

import Button from "@/components/Button";
import FormInput from "@/components/Formik/FormInput";
import ValidationMessage from "@/components/Formik/ValidationMessage";
import Label from "@/components/Label";
import Typography from "@/components/Typography";

import { BranchFormProps, BranchFormReqType, } from "../types";

const BranchForm: FC<BranchFormProps> = ({ mode }) => {
  const router = useRouter();
  const { isSubmitting, submitForm } = useFormikContext<BranchFormReqType>();

  return (
    <>
      <div className="w-[50%]">
        <Label
          containerStyle="bg-transparent"
          text="Name"
          textColor="text-imporable"
          textStyle="text-sm font-bold text-improbable"
          isRequired
        />
        <FormInput
          name="name"
          type="text"
          placeholder="Name"
          readOnly={mode == "READ"}
        />
        <ValidationMessage name="name" />
      </div>

      <div className="w-[50%]">
        <Label
          containerStyle="bg-transparent"
          text="Address"
          textColor="text-imporable"
          textStyle="text-sm font-bold text-improbable"
          isRequired
        />
        <FormInput
          name="address"
          type="text"
          placeholder="Address"
          readOnly={mode == "READ"}
        />
        <ValidationMessage name="address" />
      </div>

      <div className="w-[50%]">
        <Label
          containerStyle="bg-transparent"
          text="City"
          textColor="text-imporable"
          textStyle="text-sm font-bold text-improbable"
          isRequired
        />
        <FormInput
          name="city"
          type="text"
          placeholder="City"
          readOnly={mode == "READ"}
        />
        <ValidationMessage name="city" />
      </div>
      <div className="w-[50%]">
        <Label
          containerStyle="bg-transparent"
          text="Description"
          textColor="text-imporable"
          textStyle="text-sm font-bold text-improbable"
        />
        <FormInput
          name="description"
          type="text"
          placeholder="Description"
          readOnly={mode == "READ"}
        />
        <ValidationMessage name="description" />
      </div>

      <div className="mt-[0rem] flex w-[23.313rem]">
        <div className="w-[50%]">
          <Button
            size="sm"
            className="bg-red-400"
            onClick={() => router.back()}
          >
            <Typography className="font-bold text-base">
              {mode != "READ" ? "Cancel" : "Back"}
            </Typography>
          </Button>
        </div>
        {mode != "READ" && (
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
        )}
      </div>
    </>
  );
};

export default BranchForm;
