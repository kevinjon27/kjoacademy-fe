import { axiosClient } from "@/lib/axios.client";
import {
  GetCoursesRequest,
  GetCoursesByCategorySlugRequest,
} from "@/types/dto/course-request";
import {
  GetCoursesResponse,
  GetCoursesByCategorySlugResponse,
  GetCourseBySlugResponse,
} from "@/types/dto/course-response";

const BASE_URL = "/v1/courses";

export const getCourses = async (
  params: GetCoursesRequest & { category?: string }
): Promise<GetCoursesResponse> => {
  const response = await axiosClient.get(BASE_URL, {
    params: params || {},
  });
  return response.data;
};

export const getCoursesByCategorySlug = async (
  slug: string,
  params: GetCoursesByCategorySlugRequest
): Promise<GetCoursesByCategorySlugResponse> => {
  const response = await axiosClient.get(`${BASE_URL}/category/${slug}`, {
    params: params || {},
  });
  return response.data;
};

export const getCourseBySlug = async (
  slug: string
): Promise<GetCourseBySlugResponse> => {
  const response = await axiosClient.get(`${BASE_URL}/${slug}`);
  return response.data;
};
