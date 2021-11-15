import { ReactNode } from "react";

import { BusinessDetailsContent } from "../BusinessDetails.types";

export type InvestNowWidgetProps = {
  children?: ReactNode;
  className?: string;
  content: BusinessDetailsContent;
};
