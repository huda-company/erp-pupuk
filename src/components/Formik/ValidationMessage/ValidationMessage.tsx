import { ErrorMessage, useField } from "formik";
import React, { FC, useMemo } from "react";

import Typography from "@/components/Typography";

import type { ValidationMessageProps } from "./types";

const ValidationMessage: FC<ValidationMessageProps> = ({ name }) => {
  const [, meta] = useField(name);

  const hasError = useMemo(
    () => meta.touched && !!meta.error,
    [meta.error, meta.touched]
  );

  const renderMessage = (message: string | { [key: string]: string }) =>
    typeof message === "string"
      ? message
      : (Object.values(message)[0] as string);

  if (!hasError) return null;

  return (
    <ErrorMessage name={name}>
      {(message: any) => (
        <Typography
          variant="span"
          size="text-sm"
          lineHeight="leading-[0.813rem]"
          color="text-red-300"
          className="mt-[0.625rem] font-normal text-red-600"
        >
          {renderMessage(message)}
        </Typography>
      )}
    </ErrorMessage>
  );
};
export default ValidationMessage;
