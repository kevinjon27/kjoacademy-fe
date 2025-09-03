"use client";

import { useQuery } from "@tanstack/react-query";
import { coursesQueryKey } from "@/lib/query-key/courses";
import { getCourses, getCourseBySlug } from "@/api/student/courses.api";
import { GetCoursesRequest } from "@/types/dto/course-request";
import {
  GetCoursesResponse,
  GetCourseBySlugResponse,
} from "@/types/dto/course-response";

// Query hooks for student courses
export const useGetCourses = (params: GetCoursesRequest = {}) => {
  return useQuery({
    queryKey: coursesQueryKey.list(params),
    queryFn: async (): Promise<GetCoursesResponse> => {
      const result = await getCourses(params);
      return result;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useGetCourseBySlug = (slug: string) => {
  return useQuery({
    queryKey: coursesQueryKey.detail(slug),
    queryFn: async (): Promise<GetCourseBySlugResponse> => {
      const result = await getCourseBySlug(slug);
      return result;
    },
    enabled: !!slug,
    retry: false,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};
