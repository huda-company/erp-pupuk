import React, { FC } from "react";

import Icon from "../Icon";
import Typography from "../Typography";
import { TailwindTextSizes } from "../Typography/types";
import { NoDataContentProps } from "./types";

const NoDataContent: FC<NoDataContentProps> = ({
  message = `Add styles to your CLIENT'S order`,
  messageTxtSize = "text-xs",
  iconHeight = 164,
  iconWidth = 120,
}) => {
  return (
    <>
      <div className="flex h-full flex-col items-center pb-[2.813rem]">
        <Icon
          src="/svg/shopping-bag.svg"
          height={iconHeight}
          width={iconWidth}
        />

        <Typography
          size={messageTxtSize as TailwindTextSizes}
          variant="span"
          fontFamily="font-tertiary"
          color="text-blackOut"
          className="font-normal uppercase"
        >
          {message}
        </Typography>
      </div>
    </>
  );
};

export default NoDataContent;
