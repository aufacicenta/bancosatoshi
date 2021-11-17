import { ReactNode } from "react";

export type CheckoutContextControllerProps = {
  children: ReactNode;
};

export type CheckoutState =
  | {
      url: string | undefined;
    }
  | undefined;

export type CheckoutContextType = {
  getCheckoutURL: () => Promise<void>;
  checkout: CheckoutState;
  isLoading: boolean;
  error: string | undefined;
};
