import { Option } from "@ui/MultiDropdown";

export type OptionsComponentProps = {
  options: Option[];
  selected: Option[];
  onChange: (value: Option[]) => void;
};
