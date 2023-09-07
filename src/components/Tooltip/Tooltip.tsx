import { FC, PropsWithChildren, useRef } from "react";

import clsxm from "@/utils/clsxm";

import type { Orientation, TooltipProps } from "./types";

const Tooltip: FC<PropsWithChildren<TooltipProps>> = ({
  children,
  tooltipText,
  orientation = "top",
}) => {
  const tipRef = useRef<HTMLDivElement | null>(null);

  const handleMouseEnter = () => {
    if (tipRef.current) tipRef.current.style.opacity = "1";
  };

  const handleMouseLeave = () => {
    if (tipRef.current) tipRef.current.style.opacity = "0";
  };

  const setContainerPosition = (orientation: Orientation) => {
    let classnames;

    switch (orientation) {
      case "right":
        classnames = "top-0 left-full ml-4";
        break;
      case "left":
        classnames = "top-0 right-full mr-4 translate-y-[-5px]";
        break;
      case "top":
        classnames = "bottom-full left-[50%] translate-x-[-50%] -translate-y-2";
        break;
      case "bottom":
        classnames = "top-full left-[50%] translate-x-[-50%] translate-y-2";
        break;

      default:
        break;
    }

    return classnames;
  };

  const setPointerPosition = (orientation: Orientation) => {
    let classnames;

    switch (orientation) {
      case "right":
        classnames = "left-[-0.375rem]";
        break;
      case "left":
        classnames = "right-[-0.375rem]";
        break;
      case "top":
        classnames = "top-full left-[50%] translate-x-[-50%] -translate-y-2";
        break;
      case "bottom":
        classnames = "bottom-full left-[50%] translate-x-[-50%] translate-y-2";
        break;

      default:
        break;
    }

    return classnames;
  };

  return (
    <div
      className="relative flex items-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={clsxm(
          "pointer-events-none absolute z-10 flex w-max items-center rounded bg-shishaCoal px-4 pt-1 pb-[0.3rem] text-sm text-white transition-all duration-150",
          setContainerPosition(orientation)
        )}
        style={{ opacity: 0 }}
        ref={tipRef}
      >
        <div
          className={clsxm(
            "pointer-events-none absolute bottom-1 z-10 h-3 w-3 rotate-45 bg-shishaCoal",
            setPointerPosition(orientation)
          )}
        />
        {tooltipText}
      </div>
      {children}
    </div>
  );
};

export default Tooltip;
