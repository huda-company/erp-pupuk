import { FC } from "react";
import Typography from "../Typography";
import { HeaderModuleProps } from "./types";

const HeaderModule: FC<HeaderModuleProps> = ({ title }) => {
  return (
    <Typography className="text-[2rem] text-black font-bold underline">
      {title}
    </Typography>
  );
};

export default HeaderModule;
