import React, { FC } from "react";

import clsxm from "@/utils/clsxm";

import type { SwitchProps } from "./types";

const Switch: FC<SwitchProps> = ({ id, checked, disabled, ...rest }) => {
  return (
    <label htmlFor={id} className="flex cursor-pointer items-center">
      <div className="relative">
        <input
          type="checkbox"
          id={id}
          className="sr-only"
          disabled={disabled}
          checked={checked}
          {...rest}
        />

        <div
          className={clsxm(
            "block h-5 w-8 rounded-full border-[0.063rem]",
            checked && "border-dodgerBlue bg-dodgerBlue",
            !checked && !disabled && "border-improbable bg-beluga",
            disabled && "bg-superSilver"
          )}
        />

        <div
          className={clsxm(
            "toggle absolute top-[0.188rem] left-[0.25rem] h-[0.875rem] w-[0.875rem] rounded-full transition",
            checked && "left-[0.05rem] bg-white",
            !checked && !disabled && "bg-improbable",
            disabled && "bg-disable"
          )}
        />
      </div>
    </label>
  );
};

export default Switch;
