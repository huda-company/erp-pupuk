import React, {
  FC,
  Fragment,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";

import clsxm from "@/utils/clsxm";
import { useOnClickOutsideElement } from "@/hooks";

import type { Option, VariationDropdown } from "./types";
import Checkbox from "../Checkbox";
import Icon from "../Icon";
import Typography from "../Typography";

const VariationTwo: FC<VariationDropdown> = ({
  options,
  disabled = false,
  hasError = false,
  selectedItems,
  onChange,
  onBlur,
  onFocus,
  className,
  width,
  readOnly,
}) => {
  const [open, setIsOpen] = useState(false);

  const ref = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = useCallback(() => {
    setIsOpen(false);

    if (onBlur) onBlur();
  }, [onBlur]);

  useOnClickOutsideElement(ref, handleClickOutside);

  const handleOpenClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (readOnly) return;

    event.stopPropagation();
    setIsOpen((open) => !open);
    if (onFocus) onFocus();
  };

  const displayedItems =
    selectedItems && selectedItems.length > 0
      ? selectedItems
          .filter(({ label }) => label !== "All")
          .map(({ label }) => label)
          .join(", ")
      : "Please Choose";

  const isAllSelected = selectedItems?.find(({ label }) => label === "All");

  const renderOptions = useMemo(() => {
    const handleClick = (option: Option) => () => onChange(option);

    return options.map((option) => {
      return (
        <Fragment key={option.id}>
          <div className="mb-3 hover:cursor-pointer">
            <Checkbox
              id={option.label}
              label={option.label}
              checked={selectedItems?.some(({ id }) => id === option.id)}
              onChange={handleClick(option)}
            />
          </div>
        </Fragment>
      );
    });
  }, [onChange, options, selectedItems]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        className={clsxm(
          className,
          "flex h-[3.625rem] items-center justify-between rounded-[0.938rem] border-[0.063rem] border-whiteSmoke bg-white px-[1.086rem] pt-[1.438rem] pb-6 focus-within:border-improbable",
          hasError && "border-poppySurprise",
          width
        )}
        onClick={handleOpenClick}
      >
        <Typography
          variant="p"
          size="text-base"
          color="text-improbable"
          className="w-11/12 truncate font-medium"
        >
          {isAllSelected ? "Select All" : displayedItems}
        </Typography>

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
            "absolute z-30 mt-[0.688rem] rounded-[0.938rem] border-[0.0625rem] border-beluga bg-white py-[1.563rem] px-[1.236rem]",
            disabled && "bg-disable",
            width
          )}
        >
          <div className="max-h-[15.75rem] overflow-y-auto overflow-x-hidden">
            {renderOptions}
          </div>
        </div>
      )}
    </div>
  );
};
export default VariationTwo;
