import { ReactNode, Ref } from "react";

import { Variations } from "../config";
import { TailwindTextSizes } from "@/components/Typography/types";

export type TableHeader = Item[];

export type TableBody = BodyItems[];

export type SubHeader = Item[];

export type BodyItems = {
  items: Item[];
  current?: boolean;
};

export type Item = {
  value: string | ReactNode;
  className?: string;
  fontColor?: string;
};

export type TableData = {
  header: TableHeader;
  body: TableBody;
  subheader?: SubHeader;
};

export type VariationTable = {
  data: TableData;
  fontColor?: string;
  contentEmptyBody?: boolean;
  fixedHeaderHeight?: boolean;
};

export type VariationOptions = keyof typeof Variations;

export type TableProps = {
  variation?: VariationOptions;
  ref?: Ref<HTMLDivElement>;
} & VariationTable;

export type NoDataContentProps = {
  message?: string;
  messageTxtSize?: TailwindTextSizes;
  iconWidth?: number;
  iconHeight?: number;
};
