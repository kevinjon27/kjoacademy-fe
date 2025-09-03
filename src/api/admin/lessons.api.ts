import { axiosClient } from "@/lib/axios.client";
import { sanitizeQueryParams } from "@/lib/query-params";
import {
  GetLessonsRequest,
  CreateLessonRequest,
  UpdateLessonRequest,
} from "@/types/dto/lesson-request";
import {
  GetLessonsResponse,
  GetLessonByIdResponse,
  CreateLessonResponse,
  UpdateLessonResponse,
  DeleteLessonResponse,
} from "@/types/dto/lesson-response";

const BASE_URL = "/v1/admin/lessons";

export const getLessons = async (
  params: GetLessonsRequest
): Promise<GetLessonsResponse> => {
  const response = await axiosClient.get(BASE_URL, {
    params: sanitizeQueryParams(params),
  });
  return response.data;
};

export const getLessonById = async (
  id: string
): Promise<GetLessonByIdResponse> => {
  const response = await axiosClient.get(`${BASE_URL}/${id}`);
  return response.data;
};

export const createLesson = async (
  data: CreateLessonRequest
): Promise<CreateLessonResponse> => {
  const response = await axiosClient.post(BASE_URL, data);
  return response.data;
};

export const updateLesson = async (
  id: string,
  data: UpdateLessonRequest
): Promise<UpdateLessonResponse> => {
  const response = await axiosClient.put(`${BASE_URL}/${id}`, data);
  return response.data;
};

export const deleteLesson = async (
  id: string
): Promise<DeleteLessonResponse> => {
  const response = await axiosClient.delete(`${BASE_URL}/${id}`);
  return response.data;
};
