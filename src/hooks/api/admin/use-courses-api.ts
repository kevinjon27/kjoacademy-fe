"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { coursesQueryKey } from "@/lib/query-key/courses";
import {
  getCourses,
  getCourseBySlug,
  createCourse,
  updateCourse,
  deleteCourse,
} from "@/api/admin/courses.api";
import { toast } from "sonner";
import {
  GetCoursesRequest,
  CreateCourseRequest,
  UpdateCourseRequest,
} from "@/types/dto/course-request";
import {
  GetCourseBySlugResponse,
  GetCoursesResponse,
  CreateCourseResponse,
  UpdateCourseResponse,
  DeleteCourseResponse,
} from "@/types/dto/course-response";

// Query hooks for admin courses
export const useAdminGetCourses = (params: GetCoursesRequest = {}) => {
  return useQuery({
    queryKey: coursesQueryKey.list(params),
    queryFn: async (): Promise<GetCoursesResponse> => {
      const result = await getCourses(params);
      return result;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useAdminGetCourseBySlug = (slug: string) => {
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

// Mutation hooks for admin courses
export const useAdminCreateCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      data: CreateCourseRequest
    ): Promise<CreateCourseResponse> => {
      const result = await createCourse(data);
      return result;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: coursesQueryKey.lists(),
      });
      toast.success(data.message || "Course created successfully");
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "Failed to create course";
      toast.error(errorMessage);
    },
  });
};

export const useAdminUpdateCourse = (slug: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      data: UpdateCourseRequest
    ): Promise<UpdateCourseResponse> => {
      const result = await updateCourse(slug, data);
      return result;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: coursesQueryKey.details(slug),
      });
      queryClient.invalidateQueries({
        queryKey: coursesQueryKey.lists(),
      });
      toast.success(data.message || "Course updated successfully");
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "Failed to update course";
      toast.error(errorMessage);
    },
  });
};

export const useAdminDeleteCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (slug: string): Promise<DeleteCourseResponse> => {
      const result = await deleteCourse(slug);
      return result;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: coursesQueryKey.lists(),
      });
      toast.success(data.message || "Course deleted successfully");
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "Failed to delete course";
      toast.error(errorMessage);
    },
  });
};
