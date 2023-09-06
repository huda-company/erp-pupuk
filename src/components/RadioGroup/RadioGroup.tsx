import React, { FC } from "react";

import { Variations } from "./config";
import type { RadioGroupProps } from "./types";
import VariationOne from "./VariationOne";
import VariationThree from "./VariationThree";
import VariationTwo from "./VariationTwo";

const RadioGroup: FC<RadioGroupProps> = ({
  variation = Variations.Primary,
  ...props
}) => {
  const variations = {
    [Variations.Primary]: <VariationOne {...props} />,
    [Variations.Secondary]: <VariationTwo {...props} />,
    [Variations.Tertiary]: <VariationThree {...props} />,
  };

  return variations[variation];
};

export default RadioGroup;
