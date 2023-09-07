import { useField } from "formik";
import React, { FC, useCallback, useState } from "react";

import { useFieldError, useUpdateEffect } from "@/hooks";

import { Option } from "@/components/Dropdown/types";
import SearchableDropdown from "@/components/SearchableDropdown";

import type { FormDropdownProps } from "./types";

const FormSearchableDropdown: FC<FormDropdownProps> = (props) => {
  const { name, onChange, mode } = props;
  const [, meta, helpers] = useField(name);

  const [currentValue, setCurrentValue] = useState<Option | null>(
    meta.value || meta.initialValue
  );

  const hasError = useFieldError(name);

  useUpdateEffect(() => {
    //handling if value is not an object
    if (typeof meta.value === "object") {
      setCurrentValue(meta.value);
    } else if (meta.value !== "") {
      const findState = props.options.filter((e) => e.label === meta.value);
      if (findState.length === 1) setCurrentValue(findState[0]);
    }
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
    <SearchableDropdown
      {...props}
      selectedOption={currentValue}
      hasError={hasError}
      mode={mode}
      onChange={handleChange}
      onBlur={handleBlur}
      onFocus={handleBlur}
    />
  );
};

export default FormSearchableDropdown;
