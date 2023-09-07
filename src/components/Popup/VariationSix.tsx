import React, { FC } from "react";

import { noop } from "@/utils/helpers";

import type { PopupProps } from "./types";
import Button from "../Button";
import Typography from "../Typography";

const VariationSix: FC<PopupProps> = ({
  show,
  msg,
  msg2,
  msg3,
  msg4,
  onClose = noop,
}) => {
  const classNamePopupBody =
    "bg-white border-[0.0625rem] border-beluga h-fit w-[23rem] absolute z-50 box-border flex flex-col items-start gap-[0.625rem] rounded-[0.875rem] border px-[2rem] pb-[5.125rem] pt-[2rem]";
  const classNamePopupContent =
    "w-[19rem] h-[8.8125rem] flex flex-col items-center";

  const handleClosePopup = () => {
    onClose();
  };

  return (
    <>
      {show && (
        <div className="fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center bg-black/50">
          <div className={classNamePopupBody}>
            <div className={classNamePopupContent}>
              <div className="w-full items-center text-center">
                <Typography
                  size="text-base"
                  variant="span"
                  textAlign="text-center"
                  lineHeight="leading-[1.813rem]"
                  className="font-medium"
                >
                  {msg}
                </Typography>
                <br />
                <Typography
                  size="text-base"
                  variant="span"
                  textAlign="text-center"
                  lineHeight="leading-[1.813rem]"
                  className="font-medium"
                >
                  {msg2}
                </Typography>
                <br />
                <Typography
                  size="text-base"
                  variant="span"
                  textAlign="text-center"
                  lineHeight="leading-[1.813rem]"
                  className="font-medium"
                >
                  {msg3}
                </Typography>
                <br />
                <Typography
                  size="text-base"
                  variant="span"
                  textAlign="text-center"
                  lineHeight="leading-[1.813rem]"
                  className="font-medium"
                >
                  {msg4}
                </Typography>
                <Button
                  onClick={handleClosePopup}
                  size="xs"
                  type="submit"
                  className="mt-[1.5rem] w-full justify-center rounded-[0.938rem] border-0"
                >
                  <Typography
                    size="text-base"
                    variant="span"
                    color="white"
                    fontFamily="font-tertiary"
                    className="items-center leading-[1.813rem]"
                  >
                    OK
                  </Typography>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VariationSix;
