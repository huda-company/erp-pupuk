import React, { FC } from "react";

import clsxm from "@/utils/clsxm";

import type { LabelProps } from "./types";
import Typography from "../Typography";

const Label: FC<LabelProps> = ({
  text,
  textColor = "text-white",
  containerStyle = "bg-red-100",
  textStyle,
  isRequired,
}) => {
  return (
    <div className={clsxm("flex rounded px-1", containerStyle)}>
      <Typography
        color={textColor}
        className={clsxm(
          textStyle,
          isRequired &&
            "before:text-sm before:font-bold before:text-red-300 before:content-['*']"
        )}
      >
        {text}
      </Typography>
    </div>
  );
};

export default Label;
