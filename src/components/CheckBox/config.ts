import React from "react";

export type CheckBoxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> & {
  disabled?: boolean;
  checked?: boolean;
  onChange: (value: boolean) => void;
  text?: string;
};
