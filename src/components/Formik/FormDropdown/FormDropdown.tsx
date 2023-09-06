import { useField } from "formik";
import React, { FC, useCallback, useState } from "react";

import { useFieldError, useUpdateEffect } from "@/hooks";

import Dropdown from "@/components/Dropdown";
import { Option } from "@/components/Dropdown/types";

import type { FormDropdownProps } from "./types";

const FormDropdown: FC<FormDropdownProps> = (props) => {
  const { name, onChange } = props;

  const [, meta, helpers] = useField(name);

  const [currentValue, setCurrentValue] = useState<Option | null>(
    meta.value || meta.initialValue
  );

  const hasError = useFieldError(name);

  useUpdateEffect(() => {
    setCurrentValue(meta.value);
  }, [meta.value]);

  const handleChange = useCallback(
    (option: Option) => {
      setCurrentValue(option);
      helpers.setValue(option);
      helpers.setError("");

      if (onChange) onChange(option);
    },
    [helpers, onChange]
  );

  const handleBlur = useCallback(() => {
    helpers.setTouched(true);
  }, [helpers]);

  return (
    <Dropdown
      {...props}
      selectedOption={currentValue}
      hasError={hasError}
      onChange={handleChange}
      onBlur={handleBlur}
      onFocus={handleBlur}
    />
  );
};

export default FormDropdown;
