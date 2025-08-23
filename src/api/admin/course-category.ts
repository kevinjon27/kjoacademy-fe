import { axiosClient } from "@/lib/axios.client";
import { CourseCategoryRequest } from "@/types/dto/course-category-request";
import { CourseCategoryResponse } from "@/types/dto/course-category-response";

const BASE_URL = "/v1/admin/categories";

export const getCourseCategories = async (
  params: CourseCategoryRequest
): Promise<CourseCategoryResponse> => {
  const response = await axiosClient.get(BASE_URL, {
    params: params || {},
  });
  return response.data;
};

export const getCourseCategoryBySlug = async (slug: string) => {
  const response = await axiosClient.get(`v1/admin/course-categories/${slug}`);
  return response.data;
};

export const createCourseCategory = async (data: any) => {
  const response = await axiosClient.post(`/admin/course-categories`, data);
  return response.data;
};

// export const updateCourseCategory = async (id: string, data: any) => {
