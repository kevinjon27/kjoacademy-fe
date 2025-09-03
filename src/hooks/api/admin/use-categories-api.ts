"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { categoriesQueryKey } from "@/lib/query-key/categories";
import {
  getCourseCategories,
  getCourseCategoryBySlug,
  createCourseCategory,
  updateCourseCategory,
} from "@/api/admin/categories.api";
import { toast } from "sonner";
import {
  GetCourseCategoryRequest,
  CreateCourseCategoryRequest,
  UpdateCourseCategoryRequest,
} from "@/types/dto/course-category-request";
import {
  GetCourseCategoryBySlugResponse,
  GetCourseCategoryResponse,
  CreateCourseCategoryResponse,
  UpdateCourseCategoryResponse,
} from "@/types/dto/course-category-response";

// Query hooks for admin categories
export const useAdminGetCourseCategories = (
  params: GetCourseCategoryRequest = {}
) => {
  return useQuery({
    queryKey: categoriesQueryKey.list(params),
    queryFn: async (): Promise<GetCourseCategoryResponse> => {
      const result = await getCourseCategories(params);
      return result;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useAdminGetCourseCategoryBySlug = (slug: string) => {
  return useQuery({
    queryKey: categoriesQueryKey.detail(slug),
    queryFn: async (): Promise<GetCourseCategoryBySlugResponse> => {
      const result = await getCourseCategoryBySlug(slug);
      return result;
    },
    enabled: !!slug,
    retry: false,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};

// Mutation hooks for admin categories
export const useAdminCreateCourseCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      data: CreateCourseCategoryRequest
    ): Promise<CreateCourseCategoryResponse> => {
      const result = await createCourseCategory(data);
      return result;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: categoriesQueryKey.lists(),
      });
      toast.success(data.message || "Category created successfully");
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "Failed to create category";
      toast.error(errorMessage);
    },
  });
};

export const useAdminUpdateCourseCategory = (slug: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      data: UpdateCourseCategoryRequest
    ): Promise<UpdateCourseCategoryResponse> => {
      const result = await updateCourseCategory(slug, data);
      return result;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: categoriesQueryKey.details(slug),
      });
      queryClient.invalidateQueries({
        queryKey: categoriesQueryKey.lists(),
      });
      toast.success(data.message || "Category updated successfully");
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "Failed to update category";
      toast.error(errorMessage);
    },
  });
};
