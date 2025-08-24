import { axiosClient } from "@/lib/axios.client";
import {
  GetCourseCategoryRequest,
  CreateCourseCategoryRequest,
  UpdateCourseCategoryRequest,
} from "@/types/dto/course-category-request";
import {
  GetCourseCategoryResponse,
  CreateCourseCategoryResponse,
  UpdateCourseCategoryResponse,
} from "@/types/dto/course-category-response";

const BASE_URL = "/v1/admin/categories";

export const getCourseCategories = async (
  params: GetCourseCategoryRequest
): Promise<GetCourseCategoryResponse> => {
  const response = await axiosClient.get(BASE_URL, {
    params: params || {},
  });
  return response.data;
};

export const getCourseCategoryBySlug = async (slug: string) => {
  const response = await axiosClient.get(`${BASE_URL}/${slug}`);
  return response.data;
};

export const createCourseCategory = async (
  data: CreateCourseCategoryRequest
): Promise<CreateCourseCategoryResponse> => {
  const response = await axiosClient.post(BASE_URL, data);
  return response.data;
};

export const updateCourseCategory = async (
  slug: string,
  data: UpdateCourseCategoryRequest
): Promise<UpdateCourseCategoryResponse> => {
  const response = await axiosClient.put(`${BASE_URL}/${slug}`, data);
  return response.data;
};
