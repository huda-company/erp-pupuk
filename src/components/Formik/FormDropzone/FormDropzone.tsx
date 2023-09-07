import { useField } from "formik";
import React, { FC, useCallback, useState } from "react";

import convertToBase64 from "@/utils/convertToBase64";
import formatBytes from "@/utils/formatBytes";
import { useFieldError, useUpdateEffect } from "@/hooks";

import Dropzone from "@/components/DropZone";

import type { FormDropzoneProps } from "./types";

const FormDropzone: FC<FormDropzoneProps> = (props) => {
  const { name, maxSize } = props;

  const [, meta, helpers] = useField(name);

  const [currentValue, setCurrentValue] = useState<string>(
    meta.value || meta.initialValue
  );

  const hasError = useFieldError(name);

  useUpdateEffect(() => {
    setCurrentValue(meta.value);
  }, [meta.value]);

  const handleChange = useCallback(
    async (file: File) => {
      const size = file.size;
      const maximumSize = maxSize * 1048576;
      const formatedSize = formatBytes(file.size, 2);
      if (size < maximumSize) {
        const text: string = await convertToBase64(file);
        helpers.setValue(text);
        helpers.setError("");
      } else {
        helpers.setValue("");
        helpers.setError(
          `Max Size Excedeed: File Size ${formatedSize} > ${maxSize} MB`
        );
      }
    },
    [helpers, maxSize]
  );

  return (
    <Dropzone
      {...props}
      value={currentValue}
      hasError={hasError}
      onChange={handleChange}
      errorMessage={meta.error}
    />
  );
};

export default FormDropzone;
