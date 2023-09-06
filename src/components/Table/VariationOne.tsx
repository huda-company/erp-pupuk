import React, { forwardRef, useMemo } from "react";

import clsxm from "@/utils/clsxm";

import Typography from "@/components/Typography";

import NoDataContent from "./NoDataContent";
import type { VariationTable } from "./types";

const VariationOne = forwardRef<HTMLDivElement, VariationTable>(
  ({ data, contentEmptyBody, fixedHeaderHeight = true }, ref) => {
    const { body, header } = data;

    const renderHeader = useMemo(
      () =>
        header.map(({ value, className }, index) => (
          <th
            key={index}
            scope="col"
            className={clsxm("py-4 px-[2rem]", className)}
          >
            {typeof value === "string" ? (
              <Typography
                color="text-improbable"
                size="text-xs"
                variant="span"
                className={`font-bold uppercase tracking-widest ${
                  className && className.includes("text-white")
                    ? "text-white"
                    : ""
                }`}
              >
                {value}
              </Typography>
            ) : (
              value
            )}
          </th>
        )),
      [header]
    );

    const renderBody = useMemo(
      () =>
        body.map(({ items }, idx) => (
          <tr key={idx} className="flex border-b border-b-silverback">
            {items.map(({ value, className }, index) => (
              <td
                key={index}
                className={
                  clsxm("py-[1.875rem] px-[2rem]", className) +
                  ` ${idx === body.length - 1 ? " rounded-b-xl" : ""}`
                }
              >
                {typeof value === "string" ? (
                  <Typography
                    color="text-blackOut"
                    size="text-sm"
                    variant="p"
                    lineHeight="leading-6"
                    className={`font-light uppercase test ${
                      className && className.includes("text-white")
                        ? "text-white"
                        : className && className.includes("text-blue-600/100")
                        ? "text-blue-600/100"
                        : className &&
                          className.includes("text-red-600/100 font-bold")
                        ? "text-red-600/100 !font-bold"
                        : className && className.includes("text-red-600/100")
                        ? "text-red-600/100"
                        : ""
                    }`}
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
      <div
        ref={ref}
        className="table-overflow min-w-full flex-1 overflow-hidden overflow-x-auto py-2"
      >
        <table className="min-w-full table-auto">
          <thead>
            <tr
              className={clsxm(
                "flex items-center rounded-[0.938rem] bg-aliceBlue",
                fixedHeaderHeight && "h-[3.188rem]"
              )}
            >
              {renderHeader}
            </tr>
          </thead>
          <tbody className="relative">
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
    );
  }
);

export default VariationOne;
