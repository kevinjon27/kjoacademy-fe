import Link from "next/link";
import { Header } from "@/components/student/header";
import { Footer } from "@/components/student/footer";
import { withStudentAreaProtection } from "@/guards/withAuthProtected.server";

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Check authentication and role access - redirects admins to admin site
  await withStudentAreaProtection();

  const menuItems = [
    { href: "/user/profile/public", label: "View public profile" },
    { href: "/user/profile", label: "Profile" },
    { href: "/user/notifications", label: "Notifications" },
    { href: "/auth/logout", label: "Logout" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 min-h-screen bg-card border-r border-border">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-6">
              User Menu
            </h2>
            <nav className="space-y-2">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </aside>
        <section className="flex-1 p-6">{children}</section>
      </div>
      <Footer />
    </div>
  );
}
