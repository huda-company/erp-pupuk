import type { PopupProps } from "@/components/Popup/types";

export type Toast = PopupProps & {
  timeout?: number;
};
