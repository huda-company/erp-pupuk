import React, { FC, useMemo } from "react";

import clsxm from "@/utils/clsxm";

import Typography from "@/components/Typography";

import NoDataContent from "./NoDataContent";
import type { VariationTable } from "./types";

const VariationThree: FC<VariationTable> = ({ data, contentEmptyBody }) => {
  const { body, header } = data;

  const renderHeader = useMemo(
    () =>
      header.map(({ value, className }, index) => (
        <th
          key={index}
          scope="col"
          className={clsxm(
            "h-[3.813rem] pt-[1.313rem] pb-[1.25rem] text-sm",
            className
          )}
        >
          <Typography
            color="text-improbable"
            size="text-xs"
            variant="span"
            className="font-bold uppercase tracking-widest"
          >
            {value}
          </Typography>
        </th>
      )),
    [header]
  );

  const renderBody = useMemo(
    () =>
      body.map(({ items }, index) => (
        <tr
          key={index}
          className="flex border-b border-b-silverback last:border-0"
        >
          {items.map(({ value, className }, index) => (
            <td key={index} className={clsxm("h-[5.5rem] py-4", className)}>
              {typeof value === "string" ? (
                <Typography
                  color="text-blackOut"
                  size="text-sm"
                  variant="p"
                  lineHeight="leading-6"
                  className="font-light capitalize"
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
    <div className="table-overflow flex-1 overflow-x-auto">
      <div className="inline-block min-w-full rounded-[0.938rem] bg-white pb-[7.875rem]">
        <div className="overflow-hidden rounded-[0.938rem]">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="flex bg-aliceBlue">{renderHeader}</tr>
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

export default VariationThree;
