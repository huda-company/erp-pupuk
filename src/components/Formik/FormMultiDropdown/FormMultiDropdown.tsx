import { useField } from "formik";
import React, { FC, useCallback, useState } from "react";

import { useFieldError, useUpdateEffect } from "@/hooks";

import Dropdown from "@/components/Dropdown";
import { Variations } from "@/components/Dropdown/config";
import { Option } from "@/components/Dropdown/types";

import type { FormDropdownProps } from "./types";

const FormMultiDropdown: FC<FormDropdownProps> = (props) => {
  const { name, onChange } = props;

  const [, meta, helpers] = useField(name);

  const [currentValues, setCurrentValues] = useState<Option[]>(
    meta.value || meta.initialValue
  );

  const hasError = useFieldError(name);

  useUpdateEffect(() => {
    setCurrentValues(meta.value);
  }, [meta.value]);

  const handleChange = useCallback(
    (option: Option) => {
      if (currentValues?.includes(option)) {
        const updatedItems = currentValues.filter(
          ({ label }) => label !== option.label
        );

        helpers.setValue(updatedItems);
        setCurrentValues(updatedItems);
      } else {
        const updatedItems = [...currentValues, option];

        helpers.setValue(updatedItems);
        setCurrentValues(updatedItems);

        helpers.setError("");
      }

      if (onChange) onChange(option);
    },
    [currentValues, helpers, onChange]
  );

  const handleBlur = useCallback(() => {
    helpers.setTouched(true);
  }, [helpers]);

  return (
    <Dropdown
      {...props}
      variation={Variations.Secondary}
      selectedItems={currentValues}
      hasError={hasError}
      onChange={handleChange}
      onBlur={handleBlur}
      onFocus={handleBlur}
    />
  );
};

export default FormMultiDropdown;
