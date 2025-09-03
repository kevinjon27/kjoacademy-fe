"use client";

import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { CourseCard } from "@/components/student/courses/course-card";
import { useGetCourses } from "@/hooks/api/student/use-courses-api";

function RenderSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <Skeleton
          key={`courses-skeleton-${index}`}
          className="h-[280px] w-full"
        />
      ))}
    </div>
  );
}

export function CourseList({ slug }: { slug: string }) {
  const { data: courses, isLoading: isCoursesLoading } = useGetCourses({
    category: slug,
  });

  if (isCoursesLoading) return <RenderSkeleton />;
  if (!courses) return <p>There are no courses available.</p>;

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
      {courses.data.map((course) => (
        <Link href={`/course/${course.slug}`} key={`course-card-${course.id}`}>
          <CourseCard course={course} />
        </Link>
      ))}
    </div>
  );
}
