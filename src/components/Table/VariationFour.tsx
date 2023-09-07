import React, { FC, Fragment, useMemo } from "react";

import clsxm from "@/utils/clsxm";

import Typography from "@/components/Typography";

import type { VariationTable } from "./types";

const VariationFour: FC<VariationTable> = ({ data, fontColor }) => {
  const { body, header } = data;

  const renderHeader = useMemo(
    () =>
      header.map(({ value, className }, index) => (
        <th
          key={index}
          scope="col"
          className={clsxm(
            `border-separate bg-white py-4 px-3 text-sm ${
              index === 0 && "rounded-l-xl"
            } ${index === header.length - 1 && "rounded-r-xl"}`,
            className
          )}
        >
          <Typography
            color={fontColor ? fontColor : "text-improbable"}
            size="text-xs"
            variant="span"
            className="font-bold uppercase tracking-widest"
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
        <tr key={index} className="border-b border-b-beluga last:border-0 ">
          {items.map(({ value, className }, index) => (
            <td key={index} className={clsxm("py-4 px-3", className)}>
              {typeof value === "string" ? (
                <Typography
                  size="text-sm"
                  variant="p"
                  className="font-light capitalize"
                >
                  {value}
                </Typography>
              ) : (
                <Fragment>{value}</Fragment>
              )}
            </td>
          ))}
        </tr>
      )),
    [body]
  );

  return (
    <div className="table-overflow flex-1 overflow-x-auto ">
      <div className="inline-block min-w-full rounded-[0.938rem] py-4">
        <div className="overflow-hidden rounded-lg">
          <table className="min-w-full table-auto">
            <thead>
              <tr>{renderHeader}</tr>
            </thead>
            <tbody className="border-b border-b-silverback ">
              {renderBody}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VariationFour;
