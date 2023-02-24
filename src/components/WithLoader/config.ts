import React from "react";

export type WithLoaderProps = React.PropsWithChildren<{
  loading: boolean;
  className?: string;
}>;
