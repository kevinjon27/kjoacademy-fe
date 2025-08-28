"use client";

import { Suspense } from "react";
import { CourseForm } from "@/components/admin/courses/course-form";
import { useParams } from "next/navigation";
import { getCourseBySlug } from "@/api/admin/courses.api";
import { useQuery } from "@tanstack/react-query";
import { coursesQueryKey } from "@/lib/query-key/courses";
import { Course } from "@/types/course";

export default function EditCoursePage() {
  const { slug } = useParams();

  const { data: course, isLoading: isCourseLoading } = useQuery({
    queryKey: coursesQueryKey.detail(slug as string),
    queryFn: async (): Promise<Course> => {
      const response = await getCourseBySlug(slug as string);
      return response.data;
    },
  });

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Edit Course</h1>
        <p className="text-gray-600 mt-2">Edit your course.</p>
      </div>

      {isCourseLoading ? (
        <div>Loading...</div>
      ) : (
        <CourseForm isEdit={true} courseData={course} />
      )}
    </div>
  );
}
