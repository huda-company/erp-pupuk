import React, { FC } from "react";

import type { RadioProps } from "./types";
import Typography from "../Typography";

const Radio: FC<RadioProps> = ({ label, id, ...rest }) => {
  return (
    <div className="flex items-center">
      <input
        className="form-radio mt-[0.125rem]  cursor-pointer rounded-full border border-improbable bg-disable bg-contain bg-center bg-no-repeat align-top text-improbable transition duration-200 checked:bg-improbable focus:outline-none focus:ring-0"
        type="radio"
        id={id}
        {...rest}
      />

      {label && (
        <label className="ml-3 inline-block" htmlFor={id}>
          <Typography
            variant="span"
            size="text-sm"
            color="text-improbable"
            className="font-medium"
          >
            {label}
          </Typography>
        </label>
      )}
    </div>
  );
};

export default Radio;
