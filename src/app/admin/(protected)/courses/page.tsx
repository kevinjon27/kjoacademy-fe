"use client";

import { useQuery } from "@tanstack/react-query";
import { coursesQueryKey } from "@/lib/query-key/courses";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CourseCard } from "@/components/admin/courses/course-card";
import { getCourses } from "@/api/admin/courses.api";

export default function AdminCoursesPage() {
  const {
    data: courses = [],
    isLoading: isLoadingCourses,
    refetch: refetchCourses,
  } = useQuery({
    queryKey: coursesQueryKey.all,
    queryFn: async () => {
      const result = await getCourses({});
      return result.data;
    },
    staleTime: 5 * 1000, // 5 seconds
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Courses
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage all courses in your LMS
          </p>
        </div>
        <Link href="/admin/courses/create">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Course
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {isLoadingCourses ? (
          <div>Loading...</div>
        ) : (
          courses.map((course) => (
            <CourseCard
              key={`course-card-${course.id}`}
              course={course}
              onDeleteClick={() => {}}
            />
          ))
        )}
      </div>
    </div>
  );
}
