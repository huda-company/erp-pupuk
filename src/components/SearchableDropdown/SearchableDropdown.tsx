import React, { FC } from "react";

import { Variations } from "./config";
import type { DropdownProps } from "./types";
import VariationOne from "./VariationOne";
import VariationTwo from "./VariationTwo";

const SearchableDropdown: FC<DropdownProps> = ({
  variation = Variations.Primary,
  ...props
}) => {
  const variations = {
    [Variations.Primary]: <VariationOne {...props} />,
    [Variations.Secondary]: <VariationTwo {...props} />,
  };

  return variations[variation];
};

export default SearchableDropdown;
