import React, { useEffect, useState } from "react";
import { Session } from "@supabase/gotrue-js";
import { useRouter } from "next/router";
import { client as supabase } from "src/providers/supabase/client";
import { useCreateBusinessMutation } from "api/codegen";

import { useRoutes } from "hooks/useRoutes/useRoutes";

import { AuthContext } from "./AuthContext";
import { AuthContextControllerProps, AuthContextLoginValues } from "./AuthContext.types";

export const AuthContextController = ({ children }: AuthContextControllerProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasActiveSession, setHasActiveSession] = useState(false);
  const [session, setSession] = useState<Session | null>(null);

  const router = useRouter();
  const routes = useRoutes();

  const [createBusinessMutation] = useCreateBusinessMutation();

  useEffect(() => {
    const currentSession = supabase.auth.session();

    if (currentSession) {
      setSession(currentSession);
      setHasActiveSession(true);
    }

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, s) => {
      setSession(s);
      setHasActiveSession(true);

      if (event === "SIGNED_IN" && s?.user?.id) {
        try {
          await fetch("/api/auth", {
            method: "POST",
            headers: new Headers({ "Content-Type": "application/json" }),
            credentials: "same-origin",
            body: JSON.stringify({ event, session: s }),
          });

          await createBusinessMutation();
        } catch (error) {
          console.error(error);
        }
      }
    });

    return () => {
      authListener?.unsubscribe();
    };
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
