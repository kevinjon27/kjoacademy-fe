import { Header } from "@/components/student/header";
import { Footer } from "@/components/student/footer";
import { CoursesSidebar } from "@/components/student/courses/courses-sidebar";
import { withStudentProtection } from "@/guards/withAuthProtected.server";

export default async function CoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await withStudentProtection();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="grid grid-cols-1 lg:grid-cols-[256px_1fr] gap-0">
        <CoursesSidebar />
        <section className="p-4 sm:p-6 lg:p-8">{children}</section>
      </div>
      <Footer />
    </div>
  );
}
