import { useField } from "formik";
import React, { FC, useCallback, useState } from "react";

import { useUpdateEffect } from "@/hooks";

import Checkbox from "@/components/Checkbox";

import type { FormCheckboxProps } from "./types";

const FormCheckbox: FC<FormCheckboxProps> = (props) => {
  const { name, onChange } = props;

  const [, meta, helpers] = useField(name);

  const [currentValue, setCurrentValue] = useState<boolean>(
    meta.value || meta.initialValue
  );

  useUpdateEffect(() => {
    setCurrentValue(meta.value);
  }, [meta.value]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const checked = event.target.checked;

      setCurrentValue(checked);
      helpers.setValue(checked);
      helpers.setTouched(true);
      helpers.setError("");

      if (onChange) onChange(event);
    },
    [helpers, onChange]
  );

  return (
    <Checkbox
      {...props}
      id={name}
      checked={currentValue}
      onChange={handleChange}
    />
  );
};

export default FormCheckbox;
