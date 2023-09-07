import React, { forwardRef } from "react";

import { Variations } from "./config";
import type { TableProps } from "./types";
import VariationFour from "./VariationFour";
import VariationOne from "./VariationOne";
import VariationThree from "./VariationThree";
import VariationTwo from "./VariationTwo";

const Table = forwardRef<HTMLDivElement, TableProps>(
  (
    {
      variation = Variations.Primary,
      data,
      fontColor,
      contentEmptyBody,
      fixedHeaderHeight,
    },
    ref
  ) => {
    const variations = {
      [Variations.Primary]: (
        <VariationOne
          ref={ref}
          data={data}
          contentEmptyBody={contentEmptyBody}
          fixedHeaderHeight={fixedHeaderHeight}
        />
      ),
      [Variations.Secondary]: (
        <VariationTwo data={data} fontColor={fontColor} />
      ),
      [Variations.Tertiary]: <VariationThree data={data} />,
      [Variations.Quartenary]: <VariationFour data={data} />,
    };

    return variations[variation];
  }
);

export default Table;
