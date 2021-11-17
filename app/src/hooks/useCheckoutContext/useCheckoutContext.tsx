import { useContext } from "react";

import { CheckoutContext } from "context/checkout/CheckoutContext";

export const useCheckoutContext = () => {
  const context = useContext(CheckoutContext);

  if (context === undefined) {
    throw new Error("useCheckoutContext must be used within a TabContext");
  }

  return context;
};
