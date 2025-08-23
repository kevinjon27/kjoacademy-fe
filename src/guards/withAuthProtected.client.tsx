"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export type UserRole = "admin" | "student";

export interface AuthProtectionConfig {
  requireAuth: boolean;
  allowedRoles?: UserRole[];
  redirectTo?: string;
}

export interface AuthResult {
  isAuthenticated: boolean;
  user: {
    name: string;
    email: string;
    phone: string;
    role: string;
  } | null;
  hasRequiredRole: boolean;
  isLoading: boolean;
}

/**
 * Client-side Guard function for protecting components with authentication and role-based access control
 *
 * @param config - Configuration object for authentication requirements
 * @param config.requireAuth - Whether authentication is required to access the component
 * @param config.allowedRoles - Array of roles that are allowed to access the component
 * @param config.redirectTo - Custom redirect path (optional, defaults to login page)
 * @returns AuthResult object with authentication status and user info
 */
export function useAuthProtectedClient(
  config: AuthProtectionConfig
): AuthResult {
  const { requireAuth, allowedRoles = [], redirectTo } = config;
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;

    const isAuthenticated = !!user;

    // If authentication is required but user is not authenticated
    if (requireAuth && !isAuthenticated) {
      const loginPath = redirectTo || "/login";
      router.push(loginPath);
      return;
    }

    // Check if user has required role
    const hasRequiredRole =
      isAuthenticated &&
      allowedRoles.length > 0 &&
      allowedRoles.includes(user?.role as UserRole);

    // If authentication is required and user doesn't have the required role
    if (requireAuth && !hasRequiredRole) {
      // Redirect based on user's current role
      const redirectPath =
        redirectTo || (user?.role === "admin" ? "/admin" : "/");
      router.push(redirectPath);
      return;
    }

    setIsLoading(false);
  }, [user, authLoading, requireAuth, allowedRoles, redirectTo, router]);

  const isAuthenticated = !!user;
  const hasRequiredRole =
    isAuthenticated &&
    allowedRoles.length > 0 &&
    allowedRoles.includes(user?.role as UserRole);

  return {
    isAuthenticated,
    user: user || null,
    hasRequiredRole,
    isLoading: authLoading || isLoading,
  };
}

/**
 * Hook to protect admin-only components
 */
export function useAdminProtection() {
  return useAuthProtectedClient({
    requireAuth: true,
    allowedRoles: ["admin"],
    redirectTo: "/admin/login",
  });
}

/**
 * Hook to protect student-only components
 */
export function useStudentProtection() {
  return useAuthProtectedClient({
    requireAuth: true,
    allowedRoles: ["student"],
    redirectTo: "/login",
  });
}

/**
 * Hook to protect components that require authentication but allow any role
 */
export function useAuthProtection() {
  return useAuthProtectedClient({
    requireAuth: true,
  });
}
