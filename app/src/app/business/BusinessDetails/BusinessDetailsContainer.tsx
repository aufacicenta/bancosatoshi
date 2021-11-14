import React from "react";

import { BusinessDetails } from "./BusinessDetails";
import { BusinessDetailsProps } from "./BusinessDetails.types";

export const BusinessDetailsContainer = ({ content }: BusinessDetailsProps) => <BusinessDetails content={content} />;
