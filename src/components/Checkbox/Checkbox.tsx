import React, { FC } from "react";

import clsxm from "@/utils/clsxm";

import type { CheckboxProps } from "./types";
import Icon from "../Icon";
import Typography from "../Typography";

const Checkbox: FC<CheckboxProps> = ({ checked, id, label, ...props }) => {
  return (
    <div>
      <label htmlFor={id}>
        <div className="flex items-start gap-[0.568rem]">
          <input
            id={id}
            checked={checked}
            type="checkbox"
            className="absolute h-[0.875rem] w-[0.875rem] opacity-0"
            {...props}
          />

          <div>
            {checked ? (
              <Icon
                src="/svg/Checked.svg"
                height={14}
                width={14}
                unoptimized={true}
              />
            ) : (
              <Icon
                src="/svg/Unchecked.svg"
                height={14}
                width={14}
                unoptimized={true}
              />
            )}
          </div>

          <Typography
            variant="span"
            size="text-sm"
            color={clsxm(checked ? "text-blackOut" : "text-improbable")}
            lineHeight="leading-[1.5rem]"
            className="font-medium capitalize"
          >
            {label}
          </Typography>
        </div>
      </label>
    </div>
  );
};

export default Checkbox;
