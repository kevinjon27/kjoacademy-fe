"use client";

import { useParams } from "next/navigation";
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

  const handlePlayCourse = (course: Course) => {
    // TODO: Implement course play functionality
    console.log("Playing course:", course.title);
    // You can navigate to the course detail page or open a video player
    // window.location.href = `/courses/${course.slug}/learn`;
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} onPlay={handlePlayCourse} />
      ))}
    </div>
  );
}
