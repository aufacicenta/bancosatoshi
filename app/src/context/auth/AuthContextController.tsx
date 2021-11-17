import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Session } from "@supabase/gotrue-js";
import { useRouter } from "next/router";

import { useRoutes } from "hooks/useRoutes/useRoutes";

import { AuthContext } from "./AuthContext";
import { AuthContextControllerProps, AuthContextLoginValues } from "./AuthContext.types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const AuthContextController = ({ children }: AuthContextControllerProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasActiveSession, setHasActiveSession] = useState(false);
  const [session, setSession] = useState<Session | null>(null);

  const supabase = createClient(supabaseUrl!, supabaseAnonKey!);

  const router = useRouter();
  const routes = useRoutes();

  useEffect(() => {
    const currentSession = supabase.auth.session();

    if (currentSession) {
      setSession(currentSession);
      setHasActiveSession(true);
    }

    supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      setHasActiveSession(true);
    });
  }, []);

  const handleLogin = async ({ email }: AuthContextLoginValues) => {
    try {
      setIsLoading(true);

      const { error } = await supabase.auth.signIn(
        { email },
        { redirectTo: (router.query.redirectTo as string) || routes.home },
      );

      if (error) {
        throw new Error(error.message);
      }
    } catch {
      // @TODO handle auth error
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setIsLoading(true);

      const { error } = await supabase.auth.signOut();

      if (error) {
        throw new Error(error.message);
      }

      if (router.asPath === routes.auth.signIn) {
        router.reload();
      } else {
        router.push(routes.auth.signIn);
      }
    } catch {
      // @TODO handle auth error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ handleLogin, isLoading, session, hasActiveSession, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
