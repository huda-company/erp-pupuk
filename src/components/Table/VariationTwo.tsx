import React, { FC, useMemo } from "react";

import clsxm from "@/utils/clsxm";

import Typography from "@/components/Typography";

import NoDataContent from "./NoDataContent";
import type { VariationTable } from "./types";

const VariationTwo: FC<VariationTable> = ({
  data,
  fontColor,
  contentEmptyBody,
}) => {
  const { body, header } = data;

  const renderHeader = useMemo(
    () =>
      header.map(({ value, className }, index) => (
        <th
          key={index}
          scope="col"
          className={clsxm("py-4 px-3 text-sm", className)}
        >
          <Typography
            color={fontColor ? fontColor : "text-improbable"}
            size="text-xs"
            variant="span"
            className="font-bold uppercase tracking-widest "
          >
            {value}
          </Typography>
        </th>
      )),
    [header, fontColor]
  );

  const renderBody = useMemo(
    () =>
      body.map(({ items }, index) => (
        <tr key={index} className="border-b border-b-beluga last:border-0">
          {items.map(({ value, className }, index) => (
            <td key={index} className={clsxm("py-4 px-3", className)}>
              {typeof value === "string" ? (
                <Typography
                  size="text-sm"
                  variant="p"
                  className={`font-light capitalize
                  ${
                    className && className.includes("text-red-600/100")
                      ? "text-red-600/100"
                      : ""
                  }
                  `}
                >
                  {value}
                </Typography>
              ) : (
                value
              )}
            </td>
          ))}
        </tr>
      )),
    [body]
  );

  return (
    <div className="table-overflow flex-1 overflow-x-auto ">
      <div className="inline-block min-w-full rounded-[0.938rem] bg-aliceBlue py-4 px-12">
        <div className="overflow-hidden">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="border-b border-b-silverback">{renderHeader}</tr>
            </thead>
            <tbody>
              {body.length == 0 && contentEmptyBody ? (
                <tr>
                  <td colSpan={header.length}>
                    <NoDataContent />
                  </td>
                </tr>
              ) : (
                renderBody
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VariationTwo;
