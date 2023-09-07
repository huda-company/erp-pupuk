import React, { FC } from "react";

import { noop } from "@/utils/helpers";

import type { PopupProps } from "./types";
import Button from "../Button";
import Typography from "../Typography";

const VariationThree: FC<PopupProps> = ({
  title,
  show,
  msg,
  disabled,
  isLoading,
  onClose = noop,
  onSubmit = noop,
}) => {
  const classNamePopupBody =
    "bg-white border-[0.0625rem] border-beluga h-fit w-fit absolute z-50 box-border flex flex-col items-start gap-[0.625rem] rounded-[0.875rem] border pb-[3.125rem] pt-[2rem]";

  const handleClosePopup = () => {
    onClose();
  };

  const handleYesPopup = () => {
    onSubmit();
  };

  return (
    <>
      {show && (
        <div className="fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center bg-black/50">
          <div className={classNamePopupBody}>
            <div className="mx-[2rem] w-fit">
              {/* title content */}
              <div className="w-full border-b-[0.063rem] border-b-silverback pb-[1rem]">
                <Typography
                  color="text-blackOut"
                  size="text-base"
                  variant="span"
                  textAlign="text-center"
                  lineHeight="leading-[1.813rem]"
                  className="font-base"
                >
                  {title}
                </Typography>
              </div>
              {/* end of title content */}
              {/* body content */}
              <div className="w-full border-b-[0.063rem] border-b-silverback">
                <Typography
                  size="text-base"
                  variant="span"
                  textAlign="text-center"
                  lineHeight="leading-[1.813rem]"
                  className="font-base"
                >
                  {msg}
                </Typography>
              </div>
              {/* end of body content */}
              {/* bottom content */}
              <div className="mt-[1.615rem] flex flex-row-reverse gap-[1.25rem] text-center">
                <Button
                  onClick={handleYesPopup}
                  size="xs"
                  type="submit"
                  disabled={disabled}
                  isLoading={isLoading}
                  className="justify-center rounded-[0.938rem] border-0"
                >
                  <Typography
                    size="text-base"
                    variant="span"
                    color="white"
                    fontFamily="font-tertiary"
                    className="items-center leading-[1.813rem]"
                  >
                    Save
                  </Typography>
                </Button>
                <Button
                  onClick={handleClosePopup}
                  size="xs"
                  variant="primary"
                  className="justify-center rounded-[0.938rem] border-0 bg-disable text-shishaCoal hover:bg-disable hover:text-shishaCoal"
                >
                  <Typography
                    size="text-base"
                    variant="span"
                    fontFamily="font-tertiary"
                    className="items-center leading-[1.813rem]"
                  >
                    Cancel
                  </Typography>
                </Button>
              </div>
              {/* end of bottom content */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VariationThree;
