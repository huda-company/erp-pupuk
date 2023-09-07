import React, { FC, Fragment, useCallback, useRef, useState } from "react";

import clsxm from "@/utils/clsxm";
import { useOnClickOutsideElement } from "@/hooks";

import type { Option, VariationDropdown } from "./types";
import Icon from "../Icon";
import Typography from "../Typography";

const Dropdown: FC<VariationDropdown> = ({
  options,
  disabled = false,
  hasError = false,
  selectedOption,
  onChange,
  onBlur,
  onFocus,
  className,
  width,
  readOnly,
  emptyLabel = "Please Choose",
  notAbsolute = false,
  showChevronIcon = true,
}) => {
  const [open, setIsOpen] = useState(false);

  const ref = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = useCallback(() => {
    setIsOpen(false);
    if (onBlur) onBlur();
  }, [onBlur]);

  useOnClickOutsideElement(ref, handleClickOutside);

  const handleClick = (option: Option) => () => {
    onChange(option);
    setIsOpen(false);
  };

  const handleOpenClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (readOnly) return;

    event.stopPropagation();
    setIsOpen((open) => !open);

    if (onFocus) onFocus();
  };

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        className={clsxm(
          className,
          "flex h-[3.625rem] items-center justify-between rounded-[0.938rem] border-[0.063rem] border-whiteSmoke bg-white px-[1.086rem] pt-[1.438rem] pb-6 focus-within:border-nero",
          hasError && "border-poppySurprise",
          disabled && "bg-disable",
          width
        )}
        onClick={handleOpenClick}
      >
        <Typography
          variant="p"
          size="text-base"
          color="text-improbable"
          className="font-medium"
        >
          {selectedOption && selectedOption.label !== ""
            ? selectedOption.label
            : emptyLabel}
        </Typography>

        {showChevronIcon && (
          <Icon
            src="/svg/Chevron.svg"
            height={12}
            width={12}
            className="icon-default"
          />
        )}
      </button>

      {!disabled && open && (
        <div
          className={clsxm(
            notAbsolute ? "" : "absolute",
            " z-30 mt-[0.688rem] rounded-[0.938rem] border-[0.0625rem] border-beluga bg-white py-[1.563rem] px-[1.236rem]",
            width
          )}
        >
          <div className="max-h-[15.75rem] overflow-y-auto overflow-x-hidden">
            {options.map((option) => (
              <Fragment key={option.id}>
                <div
                  className="mb-3 hover:cursor-pointer"
                  onClick={handleClick(option)}
                >
                  <Typography
                    variant="p"
                    size="text-sm"
                    color={
                      selectedOption?.label === option.label
                        ? "text-blackOut"
                        : "text-improbable"
                    }
                    className="font-medium"
                  >
                    {option.label}
                  </Typography>
                </div>
              </Fragment>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default Dropdown;
