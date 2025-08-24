import { AdminHeader } from "@/components/admin/admin-header";
import { AdminNavigation } from "@/components/admin/admin-navigation";
import { withAdminAreaProtection } from "@/guards/withAuthProtected.server";
import { signOut } from "@/actions/auth";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Check authentication and role access - redirects students to student site
  await withAdminAreaProtection();

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
