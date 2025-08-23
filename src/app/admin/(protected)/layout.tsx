import { cookies } from "next/headers";
import { API_BASE_URL } from "@/config/api";
import { COOKIE_KEYS } from "@/config/storage";
import { axiosServer } from "@/lib/axios.server";
import { AdminHeader } from "@/components/admin/admin-header";
import { AdminNavigation } from "@/components/admin/admin-navigation";
import { withAdminAreaProtection } from "@/guards/withAuthProtected.server";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Check authentication and role access - redirects students to student site
  await withAdminAreaProtection();

  async function signOut() {
    "use server";
    try {
      await axiosServer.post(`${API_BASE_URL}/v1/auth/logout`);
      // remove auth data from cookies
      const cookieStore = await cookies();
      cookieStore.delete(COOKIE_KEYS.accessToken);
      cookieStore.delete(COOKIE_KEYS.userData);
    } catch (error) {
      console.error("Sign out error:", error);
      throw error;
    }
  }

  return (
    <div className="h-screen flex flex-col">
      <AdminHeader signOut={signOut} />
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
          <div className="p-6">
            <AdminNavigation />
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-y-auto">
          <main className="p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
