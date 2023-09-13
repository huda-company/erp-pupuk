import { FC } from "react";

import { HeaderModuleProps } from "./types";
import Typography from "../Typography";

const HeaderModule: FC<HeaderModuleProps> = ({ title }) => {
  return (
    <Typography className="text-[2rem] text-black font-bold underline">
      {title}
    </Typography>
  );
};

export default HeaderModule;
