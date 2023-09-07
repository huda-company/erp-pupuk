import React, { FC } from "react";

import clsxm from "@/utils/clsxm";
import { noop } from "@/utils/helpers";

import { DEFAULT_POPUP } from "./config";
import type { PopupProps } from "./types";
import Button from "../Button";
import Icon from "../Icon";
import Typography from "../Typography";

const VariationOne: FC<PopupProps> = ({
  show,
  type = "normal",
  msg,
  icon,
  isLoading,
  classNamePopupContentStyle,
  onClose = noop,
  onSubmit = noop,
}) => {
  const classNamePopupBody =
    "bg-white border-[0.0625rem] border-beluga h-[13.9375rem] w-[23rem] absolute z-50 box-border flex flex-col items-start gap-[0.625rem] rounded-[0.875rem] border px-[2rem] pb-[3.125rem] pt-[2rem]";
  const classNamePopupContent =
    "w-[19rem] h-[8.8125rem] flex flex-col items-center";

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
          <div
            className={clsxm(classNamePopupBody, classNamePopupContentStyle)}
          >
            <div className={classNamePopupContent}>
              {/* top content */}
              {type === "normal" ? (
                <div className="w-full">
                  <Typography
                    size="text-base"
                    variant="span"
                    textAlign="text-center"
                    lineHeight="leading-[1.813rem]"
                    className="font-medium"
                  >
                    {msg}
                  </Typography>
                </div>
              ) : (
                icon && (
                  <Icon
                    src={icon.src}
                    height={icon.height ?? DEFAULT_POPUP.DEFAULT_ICON_HEIGHT}
                    width={icon.width ?? DEFAULT_POPUP.DEFAULT_ICON_WIDTH}
                    className="inset-x-[42.43%] top-[22.42%] bottom-[46.56%] mt-[3.125rem]"
                  />
                )
              )}
              {/* end of top content */}

              {/* bottom content */}
              <div className="mt-[1.615rem] flex flex-row items-start gap-[1.25rem] text-center">
                {type === "normal" ? (
                  <>
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
                        No
                      </Typography>
                    </Button>
                    <Button
                      onClick={handleYesPopup}
                      size="xs"
                      type="submit"
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
                        Yes
                      </Typography>
                    </Button>
                  </>
                ) : (
                  <div className="h-[1.813rem]">
                    <Typography
                      size="text-base"
                      variant="span"
                      color="white"
                      textAlign="text-center"
                      fontFamily="font-tertiary"
                      className="items-center font-bold leading-[1.813rem]"
                    >
                      {msg}
                    </Typography>
                  </div>
                )}
              </div>
              {/* end of bottom content */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VariationOne;
