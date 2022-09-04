import React from "react";

import { Color } from "@configs/colorConfig";

export type ButtonProps = React.PropsWithChildren<{
  loading?: boolean;
  color?: Color;
  onClick?: (value: any) => void;
}> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;
