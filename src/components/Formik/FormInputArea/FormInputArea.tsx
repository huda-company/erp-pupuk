import { useField } from "formik";
import React, { FC, useCallback, useState } from "react";

import { useFieldError, useUpdateEffect } from "@/hooks";

import InputArea from "@/components/InputArea";

import type { FormInputAreaProps } from "./types";

const FormInputArea: FC<FormInputAreaProps> = (props) => {
  const { name } = props;

  const [, meta, helpers] = useField(name);

  const [currentValue, setCurrentValue] = useState<string | number>(
    meta.value || meta.initialValue
  );

  const hasError = useFieldError(name);

  useUpdateEffect(() => {
    setCurrentValue(meta.value);
  }, [meta.value]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const text = event.target.value;

      setCurrentValue(text);
      helpers.setValue(text);
      helpers.setError("");
    },
    [helpers]
  );

  const handleBlur = useCallback(() => {
    helpers.setTouched(true);
  }, [helpers]);

  return (
    <InputArea
      {...props}
      value={currentValue}
      hasError={hasError}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  );
};

export default FormInputArea;
