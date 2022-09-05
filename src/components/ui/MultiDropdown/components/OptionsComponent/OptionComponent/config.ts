import { Option } from "@ui/MultiDropdown";

export type OptionProps = {
  keyOpt: string;
  selected: string;
  onChange?: (values: Option[]) => void;
  isSelected: boolean;
};
