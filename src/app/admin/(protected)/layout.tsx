import { redirect } from "next/navigation";
import { API_BASE_URL } from "@/config/api";
import { auth, signOut } from "@/lib/auth";
import { axiosServer } from "@/lib/axios.server";
import { AdminHeader } from "@/components/admin/admin-header";
import { AdminNavigation } from "@/components/admin/admin-navigation";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) {
    return redirect("/admin/login");
  }

  async function signOutFromApp() {
    "use server";
    try {
      await axiosServer.post(`${API_BASE_URL}/v1/auth/logout`);
      await signOut();
    } catch (error) {
      console.error("Sign out error:", error);
      throw error;
    }
  }

  return (
    <div className="h-screen flex flex-col">
      <AdminHeader signOutFromApp={signOutFromApp} />
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
