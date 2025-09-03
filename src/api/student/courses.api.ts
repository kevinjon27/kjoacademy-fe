import { axiosClient } from "@/lib/axios.client";
import { sanitizeQueryParams } from "@/lib/query-params";
import { GetCoursesRequest } from "@/types/dto/course-request";
import {
  GetCoursesResponse,
  GetCourseBySlugResponse,
} from "@/types/dto/course-response";

const BASE_URL = "/v1/courses";

export const getCourses = async (
  params: GetCoursesRequest & { category?: string }
): Promise<GetCoursesResponse> => {
  const response = await axiosClient.get(BASE_URL, {
    params: sanitizeQueryParams(params),
  });
  return response.data;
};

export const getCourseBySlug = async (
  slug: string
): Promise<GetCourseBySlugResponse> => {
  const response = await axiosClient.get(`${BASE_URL}/${slug}`);
  return response.data;
};
