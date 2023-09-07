import React, { FC } from "react";

import { Variations } from "./config";
import type { PopupProps } from "./types";
import VariationFive from "./VariationFive";
import VariationFour from "./VariationFour";
import VariationOne from "./VariationOne";
import VariationSix from "./VariationSix";
import VariationThree from "./VariationThree";
import VariationTwo from "./VariationTwo";

const Popup: FC<PopupProps> = ({
  variation = Variations.Primary,
  ...props
}) => {
  const variations = {
    [Variations.Primary]: <VariationOne {...props} />,
    [Variations.Secondary]: <VariationTwo {...props} />,
    [Variations.Tertiary]: <VariationThree {...props} />,
    [Variations.Four]: <VariationFour {...props} />,
    [Variations.Five]: <VariationFive {...props} />,
    [Variations.Six]: <VariationSix {...props} />,
  };

  return variations[variation];
};

export default Popup;
