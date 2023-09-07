import React, { FC } from "react";

import { noop } from "@/utils/helpers";

import type { PopupProps } from "./types";
import Icon from "../Icon";

const VariationFive: FC<PopupProps> = ({ show, children, onClose = noop }) => {
  const handleClosePopup = () => {
    onClose();
  };

  return (
    <>
      {show && (
        <div
          onClick={handleClosePopup}
          className="fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center bg-black/50"
        >
          <div className="absolute z-50 box-border flex h-fit w-fit flex-col items-start gap-[0.625rem] border-[0.0625rem]  border-beluga  bg-white px-[2rem] pb-[3.125rem] pt-[2rem]">
            <div
              className="absolute -top-7 -right-7 z-50 hover:cursor-pointer"
              onClick={handleClosePopup}
            >
              <Icon height={30} width={30} src="/svg/CircleXWhite.svg" />
            </div>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default VariationFive;
