import { ClassValue } from "clsx";
import { FC, Fragment } from "react";

import clsxm from "@/utils/clsxm";
import { camelize } from "@/utils/helpers";

import Radio from "./Radio";
import { VariationRadioGroup } from "./types";

const VariationOne: FC<VariationRadioGroup> = ({
  name,
  selectedOption,
  options,
  orientation = "vertical",
  align,
  className,
  onChange,
}) => {
  const orientations: ClassValue[] = [
    orientation === "horizontal" && "flex",
    orientation === "vertical" && "flex-col",
  ];

  return (
    <div className={`flex justify-${align ?? "center"}`}>
      <div className={clsxm("gap-4", orientations, className)}>
        {options?.map(option => (
          <Fragment key={option.id}>
            <Radio
              id={option.id}
              data-testid={option.id}
              label={option.label}
              name={camelize(name || option.label)}
              checked={selectedOption?.id === option.id}
              onChange={() => onChange(option)}
            />
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default VariationOne;
