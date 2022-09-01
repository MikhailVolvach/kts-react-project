import React from "react";

export type Option = {
  key: string;
  value: string;
};

export type MultiDropdownProps = React.PropsWithChildren<{
  options: Option[];
  selected: Option[];
  onChange: (value: Option[]) => void;
  disabled?: boolean;
  pluralizeOptions: (value: Option[]) => string;
}>;
