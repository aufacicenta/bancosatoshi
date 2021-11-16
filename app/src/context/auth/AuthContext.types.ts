import { Session } from "@supabase/gotrue-js";
import { ReactNode } from "react";

export type AuthContextControllerProps = {
  children: ReactNode;
};

export type AuthContextLoginValues = {
  email: string;
};

export type AuthContextType = {
  isLoading: boolean;
  hasActiveSession: boolean;
  handleLogin: (values: AuthContextLoginValues) => Promise<void>;
  handleLogout: () => Promise<void>;
  session: Session | null;
};
