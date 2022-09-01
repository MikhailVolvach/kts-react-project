import React from "react";

export type ButtonProps = React.PropsWithChildren<{
  loading?: boolean;
  color?: string;
}> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;
