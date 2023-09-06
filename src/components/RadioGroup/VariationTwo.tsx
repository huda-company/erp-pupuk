import { FC, Fragment } from "react";

import clsxm from "@/utils/clsxm";
import { camelize } from "@/utils/helpers";

import Radio from "./Radio";
import { VariationRadioGroup } from "./types";
import Typography from "../Typography";

const VariationTwo: FC<VariationRadioGroup> = ({
  name,
  disabled = false,
  selectedOption,
  options,
  onChange,
}) => {
  return (
    <>
      <div className="flex gap-[2rem]">
        {options?.map((option, idx) => (
          <div
            key={`renderItemTypographBody_${idx}`}
            className={clsxm(
              "flex gap-5 rounded-[0.938rem] border-[0.063rem] py-[0.5rem] px-[0.5rem]",
              selectedOption?.id !== option.id
                ? "border-improbable"
                : "border-dodgerBlue"
            )}
          >
            <Fragment key={option.id}>
              <Radio
                disabled={disabled}
                id={option.id}
                data-testid={option.id}
                label=""
                name={camelize(name || option.label)}
                checked={selectedOption?.id === option.id}
                onChange={() => onChange(option)}
              />
            </Fragment>
            <div className="flex flex-col">
              <div className="mb-[0.5rem]">
                <Typography
                  size="text-sm"
                  color="text-nero"
                  className="font-bold uppercase"
                >
                  {option.label.split("-")[0]}
                </Typography>
              </div>
              <Typography
                size="text-xs"
                color="text-nero"
                className="font-normal uppercase"
              >
                {option.label.split("-")[1]}
              </Typography>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default VariationTwo;
