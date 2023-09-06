import type { DropdownProps } from "@/components/Dropdown/types";
import { Option } from "@/components/RadioGroup/types";

type Keys =
  | "selectedOption"
  | "onChange"
  | "onBlur"
  | "onFocus"
  | "selectedItems";

export type FormDropdownProps = Omit<DropdownProps, Keys> & {
  name: string;
  onChange?: (option: Option) => void;
  className?: string;
};
