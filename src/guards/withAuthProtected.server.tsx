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
 * @param config.redirectTo - Custom redirect path (optional, defaults to login page)
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
    // Redirect based on user's current role
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
 */
export async function withAdminProtection() {
  return withAuthProtectedServer({
    requireAuth: true,
    allowedRoles: ["admin"],
    redirectTo: "/admin/login",
  });
}

/**
 * Helper function to protect student-only pages
 */
export async function withStudentProtection() {
  return withAuthProtectedServer({
    requireAuth: true,
    allowedRoles: ["student"],
    redirectTo: "/login",
  });
}

/**
 * Helper function to protect pages that require authentication but allow any role
 */
export async function withAuthProtection() {
  return withAuthProtectedServer({
    requireAuth: true,
  });
}
