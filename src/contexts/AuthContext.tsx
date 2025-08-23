"use client";

import { createContext, useState, useMemo, useEffect } from "react";
import { LS_KEYS } from "@/config/storage";
import { User } from "@/types/user";

export type AuthContextType = {
  user: User | null;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem(LS_KEYS.userData);
    if (userData) {
      setUser(JSON.parse(userData) as User);
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem(LS_KEYS.userData, JSON.stringify(user));
    } else {
      localStorage.removeItem(LS_KEYS.userData);
    }
  }, [user]);

  const contextValue = useMemo(
    () => ({
      user,
    }),
    [user]
  );
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
