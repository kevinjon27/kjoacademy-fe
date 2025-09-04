"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { enrollmentsQueryKey } from "@/lib/query-key/enrollments";
import {
  getMyEnrollments,
  enrollCourse,
  getCourseProgress,
} from "@/api/student/enrollments.api";
import { toast } from "sonner";
import { EnrollCourseRequest } from "@/types/dto/student/enrollment-request";
import {
  GetMyEnrollmentsResponse,
  EnrollCourseResponse,
  GetCourseProgressResponse,
} from "@/types/dto/student/enrollment-response";

// Query hooks for student enrollments
export const useGetMyEnrollments = ({ enabled }: { enabled: boolean }) => {
  return useQuery({
    enabled,
    queryKey: enrollmentsQueryKey.me(),
    queryFn: async (): Promise<GetMyEnrollmentsResponse> => {
      const result = await getMyEnrollments();
      return result;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// Mutation hooks for student enrollments
export const useEnrollCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (courseId: string): Promise<EnrollCourseResponse> => {
      const request: EnrollCourseRequest = { course_id: courseId };
      const result = await enrollCourse(request);
      return result;
    },
    onSuccess: (data) => {
      // Invalidate and refetch enrollments
      queryClient.invalidateQueries({
        queryKey: enrollmentsQueryKey.me(),
      });
      toast.success(
        data.message || "You have successfully enrolled in this course"
      );
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "Failed to enroll in this course";
      toast.error(errorMessage);
    },
  });
};

export const useGetCourseProgress = ({
  enabled,
  courseId,
}: {
  enabled: boolean;
  courseId: string;
}) => {
  return useQuery({
    enabled,
    queryKey: enrollmentsQueryKey.courseProgress(courseId),
    queryFn: async (): Promise<GetCourseProgressResponse> => {
      const result = await getCourseProgress(courseId);
      return result;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
