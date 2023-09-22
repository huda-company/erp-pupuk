"use client";
import { useFormikContext } from "formik";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";

import Button from "@/components/Button";
import { Variations } from "@/components/Dropdown/config";
import type { Option } from "@/components/Dropdown/types";
import FormDropdown from "@/components/Formik/FormDropdown";
import FormInput from "@/components/Formik/FormInput";
import ValidationMessage from "@/components/Formik/ValidationMessage";
import Label from "@/components/Label";
import Typography from "@/components/Typography";

import { CASHFLOW_TYPES } from "../config";
import { CashflowFormProps, CashflowFormType } from "../types";

const CashflowForm: FC<CashflowFormProps> = ({ mode, cashflowCatOpts }) => {
  const router = useRouter();
  const { isSubmitting, submitForm } = useFormikContext<CashflowFormType>();
  const [cashflowType] = useState<Option[]>(CASHFLOW_TYPES);
  const [itmCat, setItmCat] = useState<Option[]>([]);

  const handleTypeChange = (param: any) => {
    const cfCat = cashflowCatOpts.filter((x) => x.metadata?.type === param.id);
    setItmCat(cfCat);
  };

  return (
    <>
      <div className="w-[50%]">
        <Label
          containerStyle="bg-transparent"
          text="Type"
          textColor="text-imporable"
          textStyle="text-sm font-bold text-improbable"
          isRequired
        />
        <FormDropdown
          emptyLabel="Select Type"
          name="typeOpt"
          variation={Variations.Primary}
          width="w-full"
          className="mt-[0.3rem]"
          options={cashflowType}
          onChange={(val) => handleTypeChange(val)}
          readOnly={mode == "READ"}
        />
        <ValidationMessage name="typeOpt" />
      </div>
      <div className="w-[50%]">
        <Label
          containerStyle="bg-transparent"
          text="Cashflow Category"
          textColor="text-imporable"
          textStyle="text-sm font-bold text-improbable"
          isRequired
        />
        <FormDropdown
          emptyLabel="Select Cashflow Category"
          name="cashflowCategoryOpt"
          variation={Variations.Primary}
          width="w-full"
          className="mt-[0.3rem]"
          options={itmCat}
          readOnly={mode == "READ"}
        />
        <ValidationMessage name="cashflowCategoryOpt" />
      </div>

      <div className="w-[50%]">
        <Label
          containerStyle="bg-transparent"
          text="Date"
          textColor="text-imporable"
          textStyle="text-sm font-bold text-improbable"
          isRequired
        />
        <FormInput
          name="date"
          type="date"
          placeholder="Date"
          value={new Date().toISOString().slice(0, 10)}
          readOnly={mode == "READ"}
        />
        <ValidationMessage name="date" />
      </div>

      <div className="w-[50%]">
        <Label
          containerStyle="bg-transparent"
          text="Amount"
          textColor="text-imporable"
          textStyle="text-sm font-bold text-improbable"
          isRequired
        />
        <FormInput
          name="amount"
          type="number"
          placeholder="amount"
          onFocus={(e) => e.target.select()}
          readOnly={mode == "READ"}
        />
        <ValidationMessage name="amount" />
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

export default CashflowForm;
