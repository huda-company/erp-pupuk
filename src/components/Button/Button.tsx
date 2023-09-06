import { ClassValue } from "clsx";
import React, { forwardRef } from "react";
import { ImSpinner2 } from "react-icons/im";

import clsxm from "@/utils/clsxm";

import type { ButtonProps } from "./types";

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      disabled: buttonDisabled,
      isLoading,
      variant = "primary",
      size = "sm",
      ...rest
    },
    ref
  ) => {
    const disabled = isLoading || buttonDisabled;

    const sizes: ClassValue[] = [
      size === "xs" && "px-11 py-[0.938rem] h-[3.188rem] min-w-[8.875rem]",
      size === "sm" &&
        "px-[3.188rem] py-[0.938rem] h-[3.188rem] min-w-[10.938rem]",
      size === "md" &&
        "px-[4.438rem] py-[0.938rem] h-[3.188rem] min-w-[15.375rem]",
      size === "lg" &&
        "px-[13.625rem] py-[1.25rem] h-[3.625rem] min-w-[33.75rem]",
    ];

    const variants: ClassValue[] = [
      variant === "primary" && [
        "bg-nero text-white",
        "border border-nero",
        "hover:bg-blackOut hover:text-white",
        "active:bg-shishaCoal",
      ],
      variant === "secondary" && [
        "bg-polarDrift text-shishaCoal",
        "border border-polarDrift",
        "hover:bg-icicles hover:text-shishaCoal",
        "active:bg-adirondack",
      ],
    ];

    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        className={clsxm(
          "inline-flex items-center justify-center rounded-2xl font-secondary font-semibold",
          "focus:outline-none focus-visible:ring focus-visible:ring-blackOut",
          "shadow-sm",
          "transition-colors duration-75",
          sizes,
          variants,
          "disabled:cursor-not-allowed disabled:border disabled:border-polarDrift disabled:bg-polarDrift disabled:text-shishaCoal disabled:opacity-75",
          isLoading &&
            "relative text-transparent transition-none hover:text-transparent disabled:cursor-wait",
          className
        )}
        {...rest}
      >
        {isLoading && (
          <div
            data-testid="loading-icon"
            className={clsxm(
              "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white"
            )}
          >
            <ImSpinner2 className="animate-spin" />
          </div>
        )}
        {children}
      </button>
    );
  }
);

export default Button;
