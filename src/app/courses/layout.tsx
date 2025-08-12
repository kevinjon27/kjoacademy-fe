import Link from 'next/link';

export default function CoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const menuItems = [
    { href: '/courses', label: 'Home' },
    { href: '/courses/onboarding', label: 'Onboarding' },
    { href: '/courses/course-a', label: 'Course A' },
    { href: '/courses/course-b', label: 'Course B' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 min-h-screen bg-card border-r border-border">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-6">Courses</h2>
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

        {/* Main content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
