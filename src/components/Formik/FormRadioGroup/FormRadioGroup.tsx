import { useField } from "formik";
import React, { FC, useCallback, useState } from "react";

import { useUpdateEffect } from "@/hooks";

import RadioGroup from "@/components/RadioGroup";
import type { Option } from "@/components/RadioGroup/types";

import type { FormRadioGroupProps } from "./types";

const FormRadioGroup: FC<FormRadioGroupProps> = (props) => {
  const { name, handleRadioChange } = props;

  const [, meta, helpers] = useField(name);

  const [currentValue, setCurrentValue] = useState<Option | undefined>(
    meta.value || meta.initialValue
  );

  useUpdateEffect(() => {
    setCurrentValue(meta.value);
  }, [meta.value]);

  const handleChange = useCallback(
    (option?: Option) => {
      setCurrentValue(option);
      helpers.setValue(option);
      helpers.setTouched(true);
      helpers.setError("");

      if (handleRadioChange) handleRadioChange(option);
    },
    [handleRadioChange, helpers]
  );

  return (
    <RadioGroup
      {...props}
      selectedOption={currentValue}
      onChange={handleChange}
    />
  );
};

export default FormRadioGroup;
