import React from "react";

export type CardProps = {
  image: string;
  title: React.ReactNode;
  subtitle: object[];
  content?: object;
  onClick?: React.MouseEventHandler;
};
