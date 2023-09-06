import { useField } from "formik";
import React, { FC, useCallback, useState } from "react";

import { useFieldError, useUpdateEffect } from "@/hooks";

import Input from "@/components/Input";

import type { FormInputProps } from "./types";

const FormInput: FC<FormInputProps> = (props) => {
  const { name, handleInputChange, ...rest } = props;

  const [, meta, helpers] = useField(name);

  const [currentValue, setCurrentValue] = useState<string | number>(
    meta.value || meta.initialValue
  );

  const hasError = useFieldError(name);

  useUpdateEffect(() => {
    setCurrentValue(meta.value);
  }, [meta.value]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const text = event.target.value;

      setCurrentValue(text);
      helpers.setValue(text);
      helpers.setError("");

      if (handleInputChange) handleInputChange(text);
    },
    [helpers, handleInputChange]
  );

  const handleBlur = useCallback(() => {
    helpers.setTouched(true);
  }, [helpers]);

  return (
    <Input
      {...rest}
      value={currentValue}
      hasError={hasError}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  );
};

export default FormInput;
