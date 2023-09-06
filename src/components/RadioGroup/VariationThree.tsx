import { ClassValue } from "clsx";
import { FC, Fragment } from "react";

import clsxm from "@/utils/clsxm";
import { camelize } from "@/utils/helpers";

import Radio from "./Radio";
import { VariationRadioGroup } from "./types";

const VariationThree: FC<VariationRadioGroup> = ({
  name,
  selectedOption,
  optionsVariationThree,
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
        <Fragment>
          <Radio
            id={optionsVariationThree?.id}
            data-testid={optionsVariationThree?.id}
            label={optionsVariationThree?.label ?? ""}
            name={camelize(name)}
            checked={selectedOption?.id === optionsVariationThree?.id}
            onChange={() => onChange(optionsVariationThree)}
          />
        </Fragment>
      </div>
    </div>
  );
};

export default VariationThree;
