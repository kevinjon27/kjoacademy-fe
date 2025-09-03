import { axiosClient } from "@/lib/axios.client";
import { sanitizeQueryParams } from "@/lib/query-params";
import {
  GetCoursesRequest,
  CreateCourseRequest,
  UpdateCourseRequest,
} from "@/types/dto/course-request";
import {
  GetCoursesResponse,
  GetCourseBySlugResponse,
  CreateCourseResponse,
  UpdateCourseResponse,
  DeleteCourseResponse,
} from "@/types/dto/course-response";

const BASE_URL = "/v1/admin/courses";

export const getCourses = async (
  params: GetCoursesRequest
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

export const createCourse = async (
  data: CreateCourseRequest
): Promise<CreateCourseResponse> => {
  const response = await axiosClient.post(BASE_URL, data);
  return response.data;
};

export const updateCourse = async (
  slug: string,
  data: UpdateCourseRequest
): Promise<UpdateCourseResponse> => {
  const response = await axiosClient.put(`${BASE_URL}/${slug}`, data);
  return response.data;
};

export const deleteCourse = async (
  slug: string
): Promise<DeleteCourseResponse> => {
  const response = await axiosClient.delete(`${BASE_URL}/${slug}`);
  return response.data;
};
