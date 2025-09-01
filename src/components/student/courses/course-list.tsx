"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { coursesQueryKey } from "@/lib/query-key/courses";
import { getCourses } from "@/api/student/courses.api";
import { CourseCard } from "@/components/student/courses/course-card";
import { Course } from "@/types/course";

export function CourseList({ slug }: { slug: string }) {
  const { data: courses = [], isLoading: isCoursesLoading } = useQuery({
    queryKey: coursesQueryKey.list({ category: slug }),
    queryFn: async () => {
      const result = await getCourses({ category: slug });
      return result.data;
    },
    staleTime: 5 * 1000,
  });

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {courses.map((course) => (
        <Link href={`/course/${course.slug}`} key={`course-card-${course.id}`}>
          <CourseCard course={course} />
        </Link>
      ))}
    </div>
  );
}
