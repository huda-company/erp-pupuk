import { useRouter } from "next/navigation";
import { FC } from "react";
import { BsArrowLeftSquare } from "react-icons/bs";

import { HeaderModuleProps } from "./types";
import Typography from "../Typography";

const HeaderModule: FC<HeaderModuleProps> = ({ title }) => {
  const router = useRouter();
  return (
    <div className="flex flex-row gap-x-3">
      <div onClick={router.back} className="cursor-pointer">
        <BsArrowLeftSquare size={20} />
      </div>
      <Typography className="text-xl text-black font-bold underline">
        {title}
      </Typography>
    </div>
  );
};

export default HeaderModule;
