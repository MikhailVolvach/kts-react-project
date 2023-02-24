import { Option } from "@components/MultiDropdown";

export type MultiDropdownOptionsProps = {
  onChange: (value: Option[]) => void;
  options: Option[];
  value: Option[];
};
