"use client";
import { useFormikContext } from "formik";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";

import Button from "@/components/Button";
import { Variations } from "@/components/Dropdown/config";
import type { Option } from "@/components/Dropdown/types";
import FormDropdown from "@/components/Formik/FormDropdown";
import FormInput from "@/components/Formik/FormInput";
import ValidationMessage from "@/components/Formik/ValidationMessage";
import Label from "@/components/Label";
import Typography from "@/components/Typography";

import { ItemFormProps, ItemFormType } from "../types";

const ItemForm: FC<ItemFormProps> = ({ mode, itemCatOpts }) => {
  const router = useRouter();
  const { isSubmitting, submitForm } = useFormikContext<ItemFormType>();
  const [itmCat, setItmCat] = useState<Option[]>(itemCatOpts);

  useEffect(() => {
    setItmCat(itemCatOpts);
  }, [itemCatOpts]);

  return (
    <>
      <div className="w-[50%]">
        <Label
          containerStyle="bg-transparent"
          text="Category"
          textColor="text-imporable"
          textStyle="text-sm font-bold text-improbable"
          isRequired
        />
        <FormDropdown
          emptyLabel="Select Item Category"
          name="itemCategoryOpt"
          variation={Variations.Primary}
          width="w-full"
          className="mt-[0.3rem]"
          options={itmCat}
          readOnly={mode == "READ"}
        />
        <ValidationMessage name="itemCategoryOpt" />
      </div>

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
          text="Price"
          textColor="text-imporable"
          textStyle="text-sm font-bold text-improbable"
          isRequired
        />
        <FormInput
          name="price"
          type="number"
          placeholder="Price"
          readOnly={mode == "READ"}
        />
        <ValidationMessage name="price" />
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

export default ItemForm;
