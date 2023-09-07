import { Variations } from "../config";

export type Option = {
  id: string | any;
  label: string;
  metadata?: {
    [key: string]: string;
  };
};

export type VariationOptions = keyof typeof Variations;

export type VariationDropdown = {
  options: Option[];
  disabled?: boolean;
  hasError?: boolean;
  className?: string;
  selectedOption?: Option | null;
  selectedItems?: Option[] | null;
  width?: string;
  readOnly?: boolean;
  showChevronIcon?: boolean;
  emptyLabel?: string;
  notAbsolute?: boolean;
  onChange: (option: Option) => void;
  onBlur: () => void;
  onFocus: () => void;
};

export type DropdownProps = {
  variation?: VariationOptions;
} & VariationDropdown;
