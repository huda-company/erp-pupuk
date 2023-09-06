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
  mode = "add",
}) => {
  const [open, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const [query, setQuery] = useState(
    mode.toLowerCase() === "add" ? emptyLabel : ""
  );
  const handleClickOutside = useCallback(() => {
    setIsOpen(false);
    if (onBlur) onBlur();
  }, [onBlur]);

  useOnClickOutsideElement(ref, handleClickOutside);

  const handleClick = (option: Option) => () => {
    setQuery(() => "");
    onChange(option);
    setIsOpen(false);
  };

  const handleOpenClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (readOnly) return;
    if (query === emptyLabel) setQuery(""); // clear text default value
    event.stopPropagation();
    setIsOpen((open) => !open);

    if (onFocus) onFocus();
  };

  const filter = (options: any) => {
    return options.filter(
      (option: any) =>
        option["label"]?.toLowerCase().indexOf(query.toLowerCase()) > -1
    );
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
        <input
          // ref={inputRef}
          disabled={disabled}
          type="text"
          value={selectedOption?.label !== "" ? selectedOption?.label : query}
          // name="state"
          className={`w-[100%] border-0 px-0 ${disabled ? "bg-disable" : ""}`}
          onChange={(e) => {
            setQuery(e.target.value);
            onChange({ label: "", id: "" });
            if (!open) setIsOpen(true);
          }}
          onClick={() => {
            setQuery("");
          }}
        />
        <Icon
          src="/svg/Chevron.svg"
          height={12}
          width={12}
          className="icon-default"
        />
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
            {filter(options).map((option: any) => (
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
