import { CourseList } from "@/components/student/courses/course-list";

export default function CoursesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Welcome to Courses
        </h1>
        <p className="text-muted-foreground">
          This is the courses page of KJO Academy. Explore our comprehensive
          curriculum designed to take you from beginner to expert.
        </p>
      </div>

      <CourseList slug={""} />
    </div>
  );
}
