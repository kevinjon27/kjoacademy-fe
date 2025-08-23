import { axiosServer } from "@/lib/axios.server";
import { CourseCategoryRequest } from "@/types/dto/course-category-request";
import { CourseCategoryResponse } from "@/types/dto/course-category-response";

const BASE_URL = "/v1/admin/categories";

export const getCourseCategories = async (
  params: CourseCategoryRequest
): Promise<CourseCategoryResponse> => {
  const response = await axiosServer.get(BASE_URL, {
    params: params || {},
  });
  return response.data;
};

export const getCourseCategoryBySlug = async (slug: string) => {
  const response = await axiosServer.get(`v1/admin/course-categories/${slug}`);
  return response.data;
};

export const createCourseCategory = async (data: any) => {
  const response = await axiosServer.post(`/admin/course-categories`, data);
  return response.data;
};
