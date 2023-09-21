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

import { UserFormProps, UserFormType } from "../types";

const UserForm: FC<UserFormProps> = ({ mode, roleOpts }) => {
  const router = useRouter();
  const { isSubmitting, submitForm } = useFormikContext<UserFormType>();
  const [roleOpt, setRoleOpt] = useState<Option[]>(roleOpts);

  useEffect(() => {
    setRoleOpt(roleOpts);
  }, [roleOpts]);

  return (
    <>
      <div className="w-[50%]">
        <Label
          containerStyle="bg-transparent"
          text="Role"
          textColor="text-imporable"
          textStyle="text-sm font-bold text-improbable"
          isRequired
        />
        <FormDropdown
          emptyLabel="Select Role"
          name="roleOpt"
          variation={Variations.Primary}
          width="w-full"
          className="mt-[0.3rem]"
          options={roleOpt}
          readOnly={mode == "READ"}
        />
        <ValidationMessage name="roleOpt" />
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

      {mode == "ADD" && (
        <div className="w-[50%]">
          <Label
            containerStyle="bg-transparent"
            text="Password"
            textColor="text-imporable"
            textStyle="text-sm font-bold text-improbable"
          />
          <FormInput name="password" type="text" placeholder="Password" />
          <ValidationMessage name="password" />
        </div>
      )}

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

export default UserForm;
