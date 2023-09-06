import { TextareaHTMLAttributes } from "react";

type Icon = {
  src: string;
  height: number;
  width: number;
  onClick?: () => void;
};

export type InputAreaProps = {
  label?: string;
  leftIcon?: Icon;
  rightIcon?: Icon;
  hasError?: boolean;
  msgError?: string;
  bgColor?: string;
  darkenIcon?: boolean;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;
