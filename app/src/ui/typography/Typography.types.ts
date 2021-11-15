import { AnchorHTMLAttributes, ReactNode } from "react";

export type TypographyProps = {
  children: ReactNode;
  className?: string;
  inline?: boolean;
};

export type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement>;
