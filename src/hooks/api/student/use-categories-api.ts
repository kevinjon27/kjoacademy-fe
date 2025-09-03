"use client";

import { useQuery } from "@tanstack/react-query";
import { categoriesQueryKey } from "@/lib/query-key/categories";
import { getCourseCategories } from "@/api/student/categories.api";
import { GetCourseCategoryRequest } from "@/types/dto/course-category-request";
import { GetCourseCategoryResponse } from "@/types/dto/course-category-response";

export function useGetCourseCategories(params: GetCourseCategoryRequest = {}) {
  return useQuery({
    queryKey: categoriesQueryKey.all,
    queryFn: async (): Promise<GetCourseCategoryResponse> => {
      const result = await getCourseCategories(params);
      return result;
    },
  });
}
