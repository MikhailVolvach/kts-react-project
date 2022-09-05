import React from "react";

export type CheckBoxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> & {
  checked?: boolean;
  onChange: (value: boolean) => void;
  text?: string;
};
