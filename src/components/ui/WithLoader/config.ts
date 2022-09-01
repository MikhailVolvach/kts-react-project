import React from "react";

import { LoaderSize } from "@ui/Loader";

export type WithLoaderProps = React.PropsWithChildren<{
  loading: boolean;
  size?: LoaderSize;
  loaderColor?: string;
}>;
