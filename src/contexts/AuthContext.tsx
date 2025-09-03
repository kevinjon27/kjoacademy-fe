"use client";

import { createContext, useMemo } from "react";
import Cookies from "js-cookie";
import { useQuery } from "@tanstack/react-query";
import { COOKIE_KEYS } from "@/config/storage";
import { userQueryKey } from "@/lib/query-key/user";
import { getMe as getAdminMe } from "@/api/admin/user.api";
import { getMe as getStudentMe } from "@/api/student/user.api";
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
  const { data: userData } = useQuery({
    enabled: !!Cookies.get(COOKIE_KEYS.accessToken),
    queryKey: userQueryKey.me,
    queryFn: async () => {
      const result = await (authFor === "admin" ? getAdminMe : getStudentMe)();
      return result;
    },
    staleTime: 60 * 5 * 1000,
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
