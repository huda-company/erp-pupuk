import { Option } from "@/components/Dropdown/types";
import type { RadioGroupProps } from "@/components/RadioGroup/types";

type Keys = "selectedOption" | "onChange";

export type FormRadioGroupProps = Omit<RadioGroupProps, Keys> & {
  name: string;
  handleRadioChange?: (value: Option | undefined) => void;
};
