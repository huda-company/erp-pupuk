import Button from "@/components/Button";
import FormInput from "@/components/Formik/FormInput";
import Label from "@/components/Label";
import { Typography } from "@material-tailwind/react";
import { useFormikContext } from "formik";
import { useRouter } from "next/navigation";
import { SupplierFormType } from "../types";
import ValidationMessage from "@/components/Formik/ValidationMessage";

const SupplierForm = () => {
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
        <FormInput name="company" type="text" placeholder="Supplier Name" />
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
        <FormInput name="managerName" type="text" placeholder="Manager Name" />
        <ValidationMessage name="managerName" />
      </div>

      <div className="w-[50%]">
        <Label
          containerStyle="bg-transparent"
          text="Email"
          textColor="text-imporable"
          textStyle="text-sm font-bold text-improbable"
          isRequired
        />
        <FormInput name="email" type="email" placeholder="Email" />
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
        <FormInput name="bankAccount" type="text" placeholder="Bank Account" />
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
        <FormInput name="tel" type="text" placeholder="Phone" />
        <ValidationMessage name="tel" />
      </div>

      <div className="mt-[0rem] flex w-[23.313rem]">
        <div className="w-[50%]">
          <Button size="sm" className="bg-red-400" onClick={router.back}>
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
      </div>
    </>
  );
};

export default SupplierForm;
