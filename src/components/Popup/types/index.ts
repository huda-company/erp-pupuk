import { ReactNode } from "react";

import { Variations } from "../config";

type Icon = {
  src: string;
  height?: number;
  width?: number;
};

type Variant = "normal" | "warning" | "success";

export type VariationPopup = {
  onClose?: () => void;
  onSubmit?: () => void;
  show?: boolean;
  type?: Variant;
  msg?: string | ReactNode;
  msg2?: string | ReactNode;
  msg3?: string | ReactNode;
  msg4?: string | ReactNode;
  icon?: Icon;
  title?: string;
  popupBodyStyle?: string;
  isLoading?: boolean;
  classNamePopupContentStyle?: string;
  disabled?: boolean;
  children?: ReactNode;
  buttonSubmitText?: string;
  buttonCloseText?: string;
};

export type VariationOptions = keyof typeof Variations;

export type PopupProps = {
  variation?: VariationOptions;
} & VariationPopup;
