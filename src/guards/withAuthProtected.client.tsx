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
 * Client-side guard function for protecting components with authentication and role-based access control
 * 
 * @param config - Configuration object for authentication requirements
 * @param config.requireAuth - Whether authentication is required to access the component
 * @param config.allowedRoles - Array of roles that are allowed to access the component
 * @param config.redirectTo - Custom redirect path (optional, defaults to role-based redirects)
 * @returns AuthResult object with authentication status and user info
 */
export function useAuthProtectedClient(
  config: AuthProtectionConfig
): AuthResult {
  const { requireAuth, allowedRoles = [], redirectTo } = config;
  const { user } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const isAuthenticated = !!user;
    
    // If authentication is required but user is not authenticated
    if (requireAuth && !isAuthenticated) {
      const loginPath = redirectTo || "/login";
      router.push(loginPath);
      return;
    }
    
    // Check if user has required role
    const hasRequiredRole = isAuthenticated && 
      allowedRoles.length > 0 && 
      allowedRoles.includes(user?.role as UserRole);
    
    // If authentication is required and user doesn't have the required role
    if (requireAuth && !hasRequiredRole) {
      // Redirect based on user's current role to their appropriate area
      const redirectPath = redirectTo || 
        (user?.role === "admin" ? "/admin" : "/");
      router.push(redirectPath);
      return;
    }
    
    setIsLoading(false);
  }, [user, requireAuth, allowedRoles, redirectTo, router]);

  const isAuthenticated = !!user;
  const hasRequiredRole = isAuthenticated && 
    allowedRoles.length > 0 && 
    allowedRoles.includes(user?.role as UserRole);

  return {
    isAuthenticated,
    user: user || null,
    hasRequiredRole,
    isLoading,
  };
}

/**
 * Hook to protect admin-only components
 * - Redirects unauthenticated users to /admin/login
 * - Redirects authenticated students to / (student front page)
 * - Allows only admin users
 */
export function useAdminProtection() {
  return useAuthProtectedClient({
    requireAuth: true,
    allowedRoles: ["admin"],
    redirectTo: "/admin/login", // For unauthenticated users
  });
}

/**
 * Hook to protect student-only components
 * - Redirects unauthenticated users to /login
 * - Redirects authenticated admins to /admin (admin overview page)
 * - Allows only student users
 */
export function useStudentProtection() {
  return useAuthProtectedClient({
    requireAuth: true,
    allowedRoles: ["student"],
    redirectTo: "/login", // For unauthenticated users
  });
}

/**
 * Hook to protect components that require authentication but allow any role
 * - Redirects unauthenticated users to /login
 * - Allows both admin and student users
 */
export function useAuthProtection() {
  return useAuthProtectedClient({
    requireAuth: true,
  });
}

/**
 * Hook to protect admin area components (redirects students to student site)
 * - Redirects unauthenticated users to /admin/login
 * - Redirects authenticated students to / (student front page)
 * - Allows only admin users
 */
export function useAdminAreaProtection() {
  const { user } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // If not authenticated, redirect to admin login
    if (!user) {
      router.push("/admin/login");
      return;
    }
    
    // If authenticated but not admin, redirect to student site
    if (user.role !== "admin") {
      router.push("/");
      return;
    }
    
    setIsLoading(false);
  }, [user, router]);

  const isAuthenticated = !!user;
  const hasRequiredRole = isAuthenticated && user?.role === "admin";

  return {
    isAuthenticated,
    user: user || null,
    hasRequiredRole,
    isLoading,
  };
}

/**
 * Hook to protect student area components (redirects admins to admin site)
 * - Redirects unauthenticated users to /login
 * - Redirects authenticated admins to /admin (admin overview page)
 * - Allows only student users
 */
export function useStudentAreaProtection() {
  const { user } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // If not authenticated, redirect to student login
    if (!user) {
      router.push("/login");
      return;
    }
    
    // If authenticated but not student, redirect to admin site
    if (user.role !== "student") {
      router.push("/admin");
      return;
    }
    
    setIsLoading(false);
  }, [user, router]);

  const isAuthenticated = !!user;
  const hasRequiredRole = isAuthenticated && user?.role === "student";

  return {
    isAuthenticated,
    user: user || null,
    hasRequiredRole,
    isLoading,
  };
}

/**
 * Hook to protect student auth components (login, register, etc.)
 * - Redirects authenticated students to / (student front page)
 * - Redirects authenticated admins to /admin (admin overview page)
 * - Allows unauthenticated users to access login components
 */
export function useStudentAuthProtection() {
  const { user } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // If authenticated, redirect based on role
    if (user) {
      if (user.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/");
      }
      return;
    }
    
    setIsLoading(false);
  }, [user, router]);

  return {
    isAuthenticated: !!user,
    user: user || null,
    hasRequiredRole: false,
    isLoading,
  };
}

/**
 * Hook to protect admin auth components (login, register, etc.)
 * - Redirects authenticated admins to /admin (admin overview page)
 * - Redirects authenticated students to / (student front page)
 * - Allows unauthenticated users to access login components
 */
export function useAdminAuthProtection() {
  const { user } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // If authenticated, redirect based on role
    if (user) {
      if (user.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/");
      }
      return;
    }
    
    setIsLoading(false);
  }, [user, router]);

  return {
    isAuthenticated: !!user,
    user: user || null,
    hasRequiredRole: false,
    isLoading,
  };
}
