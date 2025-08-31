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
      <div className="flex">
        <CoursesSidebar />
        <section className="flex-1 p-6">{children}</section>
      </div>
      <Footer />
    </div>
  );
}
