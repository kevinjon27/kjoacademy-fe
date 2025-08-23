"use client";
import { useContext } from "react";
import { AuthContext, AuthContextType } from "@/contexts/AuthContext";

export function useAuth(): AuthContextType {
  const userCtx = useContext(AuthContext);
  if (userCtx === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return userCtx as AuthContextType;
}
