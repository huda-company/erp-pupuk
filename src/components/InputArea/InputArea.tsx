import React, { FC, useRef } from "react";

import clsxm from "@/utils/clsxm";

import type { InputAreaProps } from "./types";
import Icon from "../Icon";
import Typography from "../Typography";

const InputArea: FC<InputAreaProps> = ({
  leftIcon,
  rightIcon,
  disabled = false,
  hasError = false,
  darkenIcon = true,
  msgError,
  bgColor = "bg-white",
  className,
  value,
  readOnly,
  onFocus,
  ...rest
}) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleFocus = (
    event: React.FocusEvent<HTMLTextAreaElement, Element>
  ) => {
    if (readOnly) inputRef.current?.blur();

    if (onFocus) onFocus(event);
  };

  return (
    <>
      <>
        <div
          className={clsxm(
            "flex w-full flex-grow appearance-none items-center",
            "rounded-[0.938rem] border py-1 px-3 text-blackOut",
            "duration-150 focus-within:border-nero focus-within:transition-all sm:text-sm",
            darkenIcon && "focus-within:input-icon",
            darkenIcon && value && "input-icon",
            bgColor && bgColor,
            !disabled && !readOnly && value && "border border-nero",
            hasError && "border-poppySurprise",
            disabled && "bg-disable"
          )}
        >
          {leftIcon && (
            <div className="pl-2 pt-1" onClick={leftIcon?.onClick}>
              <Icon
                src={leftIcon.src}
                height={leftIcon.height}
                width={leftIcon.width}
              />
            </div>
          )}
          <textarea
            value={value}
            disabled={disabled}
            onFocus={handleFocus}
            readOnly={readOnly}
            className={clsxm(
              className,
              "block w-full border-transparent px-3 py-2 text-base leading-[1.813rem] text-nero focus:border-transparent focus:outline-none focus:ring-0",
              "placeholder-improbable",
              disabled && "bg-disable text-improbable",
              readOnly && "cursor-default"
            )}
            {...rest}
          />
          {rightIcon && (
            <div
              className="cursor-pointer pr-2 pt-1"
              data-testid={rightIcon.src}
              onClick={rightIcon?.onClick}
            >
              <Icon
                src={rightIcon.src}
                height={rightIcon.height}
                width={rightIcon.width}
              />
            </div>
          )}
        </div>
        {hasError && (
          <Typography
            variant="p"
            fontFamily="font-secondary"
            size="text-sm"
            lineHeight="leading-[1.063rem]"
            textAlign="text-left"
            color="text-poppySurprise"
            className="mt-[0.5rem] font-light"
          >
            {msgError}
          </Typography>
        )}
      </>
    </>
  );
};

export default InputArea;
