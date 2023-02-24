import React from "react";

export type ButtonProps = React.PropsWithChildren<{
  loading?: boolean;
  className?: string;
}> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;
