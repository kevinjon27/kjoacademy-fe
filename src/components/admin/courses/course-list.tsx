import { CourseCard } from "@/components/admin/courses/course-card";
import { Course } from "@/types/course";

export type Props = {
  courses: Course[];
};

export function CourseList({ courses }: Props) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {courses.map((course) => (
        <CourseCard key={`course-card-${course.id}`} course={course} />
      ))}
    </div>
  );
}
