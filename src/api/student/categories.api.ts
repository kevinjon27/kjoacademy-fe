import { axiosClient } from "@/lib/axios.client";
import { GetCourseCategoryRequest } from "@/types/dto/course-category-request";
import { GetCourseCategoryResponse } from "@/types/dto/course-category-response";

const BASE_URL = "/v1/categories";

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
