import { getAuthData } from "@/lib/auth";
import { redirect } from "next/navigation";

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
}

/**
 * Guard function for protecting pages with authentication and role-based access control
 * 
 * @param config - Configuration object for authentication requirements
 * @param config.requireAuth - Whether authentication is required to access the page
 * @param config.allowedRoles - Array of roles that are allowed to access the page
 * @param config.redirectTo - Custom redirect path (optional, defaults to role-based redirects)
 * @returns AuthResult object with authentication status and user info
 */
export default async function withAuthProtectedServer(
  config: AuthProtectionConfig
): Promise<AuthResult> {
  const { requireAuth, allowedRoles = [], redirectTo } = config;
  
  // Get authentication data
  const authData = await getAuthData();
  
  // Check if user is authenticated
  const isAuthenticated = !!authData && !!authData.accessToken;
  
  // If authentication is required but user is not authenticated
  if (requireAuth && !isAuthenticated) {
    const loginPath = redirectTo || "/login";
    redirect(loginPath);
  }
  
  // If user is authenticated but no specific roles are required
  if (isAuthenticated && allowedRoles.length === 0) {
    return {
      isAuthenticated: true,
      user: authData!.user,
      hasRequiredRole: true,
    };
  }
  
  // Check if user has required role
  const hasRequiredRole = isAuthenticated && 
    allowedRoles.length > 0 && 
    allowedRoles.includes(authData!.user.role as UserRole);
  
  // If authentication is required and user doesn't have the required role
  if (requireAuth && !hasRequiredRole) {
    // Redirect based on user's current role to their appropriate area
    const redirectPath = redirectTo || 
      (authData!.user.role === "admin" ? "/admin" : "/");
    redirect(redirectPath);
  }
  
  return {
    isAuthenticated,
    user: authData?.user || null,
    hasRequiredRole,
  };
}

/**
 * Helper function to protect admin-only pages
 * - Redirects unauthenticated users to /admin/login
 * - Redirects authenticated students to / (student front page)
 * - Allows only admin users
 */
export async function withAdminProtection() {
  return withAuthProtectedServer({
    requireAuth: true,
    allowedRoles: ["admin"],
    redirectTo: "/admin/login", // For unauthenticated users
  });
}

/**
 * Helper function to protect student-only pages
 * - Redirects unauthenticated users to /login
 * - Redirects authenticated admins to /admin (admin overview page)
 * - Allows only student users
 */
export async function withStudentProtection() {
  return withAuthProtectedServer({
    requireAuth: true,
    allowedRoles: ["student"],
    redirectTo: "/login", // For unauthenticated users
  });
}

/**
 * Helper function to protect pages that require authentication but allow any role
 * - Redirects unauthenticated users to /login
 * - Allows both admin and student users
 */
export async function withAuthProtection() {
  return withAuthProtectedServer({
    requireAuth: true,
  });
}

/**
 * Helper function to protect admin area (redirects students to student site)
 * - Redirects unauthenticated users to /admin/login
 * - Redirects authenticated students to / (student front page)
 * - Allows only admin users
 */
export async function withAdminAreaProtection() {
  const authData = await getAuthData();
  
  // If not authenticated, redirect to admin login
  if (!authData || !authData.accessToken) {
    redirect("/admin/login");
  }
  
  // If authenticated but not admin, redirect to student site
  if (authData.user.role !== "admin") {
    redirect("/");
  }
  
  return {
    isAuthenticated: true,
    user: authData.user,
    hasRequiredRole: true,
  };
}

/**
 * Helper function to protect student area (redirects admins to admin site)
 * - Redirects unauthenticated users to /login
 * - Redirects authenticated admins to /admin (admin overview page)
 * - Allows only student users
 */
export async function withStudentAreaProtection() {
  const authData = await getAuthData();
  
  // If not authenticated, redirect to student login
  if (!authData || !authData.accessToken) {
    redirect("/login");
  }
  
  // If authenticated but not student, redirect to admin site
  if (authData.user.role !== "student") {
    redirect("/admin");
  }
  
  return {
    isAuthenticated: true,
    user: authData.user,
    hasRequiredRole: true,
  };
}

/**
 * Helper function to protect student auth pages (login, register, etc.)
 * - Redirects authenticated students to / (student front page)
 * - Redirects authenticated admins to /admin (admin overview page)
 * - Allows unauthenticated users to access login pages
 */
export async function withStudentAuthProtection() {
  const authData = await getAuthData();
  
  // If authenticated, redirect based on role
  if (authData && authData.accessToken) {
    if (authData.user.role === "admin") {
      redirect("/admin");
    } else {
      redirect("/");
    }
  }
  
  return {
    isAuthenticated: false,
    user: null,
    hasRequiredRole: false,
  };
}

/**
 * Helper function to protect admin auth pages (login, register, etc.)
 * - Redirects authenticated admins to /admin (admin overview page)
 * - Redirects authenticated students to / (student front page)
 * - Allows unauthenticated users to access login pages
 */
export async function withAdminAuthProtection() {
  const authData = await getAuthData();
  
  // If authenticated, redirect based on role
  if (authData && authData.accessToken) {
    if (authData.user.role === "admin") {
      redirect("/admin");
    } else {
      redirect("/");
    }
  }
  
  return {
    isAuthenticated: false,
    user: null,
    hasRequiredRole: false,
  };
}
