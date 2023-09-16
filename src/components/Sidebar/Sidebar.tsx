import React, { FC } from "react";

import { Variations } from "./config";
import Sidebar1 from "./Sidebar1";
import Sidebar2 from "./Sidebar2";
import { SidebarProps } from "./types";

const Sidebar: FC<SidebarProps> = ({
  variation = Variations.Primary,
  ...props
}) => {
  const variations = {
    [Variations.Primary]: <Sidebar1 {...props} />,
    [Variations.Secondary]: <Sidebar2 {...props} />,
  };

  return variations[variation];
};

export default Sidebar;
