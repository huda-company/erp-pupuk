import { InputHTMLAttributes } from "react";

import { Variations } from "../config";

type Orientation = "horizontal" | "vertical";

export type Option = {
  id: string;
  label: string;
};

export type RadioProps = {
  label: string;
} & InputHTMLAttributes<HTMLInputElement>;

export type VariationOptions = keyof typeof Variations;

export type VariationRadioGroup = {
  name: string;
  disabled?: boolean;
  options?: Option[];
  optionsVariationThree?: Option;
  orientation?: Orientation;
  selectedOption?: Option | null;
  align?: string;
  className?: string;
  onChange: (option?: Option) => void;
};

export type RadioGroupProps = {
  variation?: VariationOptions;
} & VariationRadioGroup;
