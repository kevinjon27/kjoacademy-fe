"use client";

import { createContext, useMemo } from "react";
import Cookies from "js-cookie";
import { COOKIE_KEYS } from "@/config/storage";
import { useGetCurrentUser } from "@/hooks/api/use-users-api";
import { User } from "@/types/user";

export type AuthContextType = {
  user: User | null;
  authFor: string;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  authFor: "",
});

export const AuthProvider = ({
  authFor,
  children,
}: {
  authFor: "admin" | "student";
  children: React.ReactNode;
}) => {
  const { data: userData } = useGetCurrentUser({
    enabled: !!Cookies.get(COOKIE_KEYS.accessToken),
    authFor,
  });
  const user = useMemo<User | null>(() => userData ?? null, [userData]);

  const contextValue = useMemo(
    () => ({
      user,
      authFor,
    }),
    [user, authFor]
  );
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
