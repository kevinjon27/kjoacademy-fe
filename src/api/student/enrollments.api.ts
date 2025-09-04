import { axiosClient } from "@/lib/axios.client";
import { EnrollCourseRequest } from "@/types/dto/student/enrollment-request";
import {
  GetMyEnrollmentsResponse,
  EnrollCourseResponse,
  GetCourseProgressResponse,
} from "@/types/dto/student/enrollment-response";

const BASE_URL = "/v1/enrollments";

export const getMyEnrollments = async (): Promise<GetMyEnrollmentsResponse> => {
  const response = await axiosClient.get(`${BASE_URL}/me`);
  return response.data;
};

export const enrollCourse = async (
  body: EnrollCourseRequest
): Promise<EnrollCourseResponse> => {
  const response = await axiosClient.post(`${BASE_URL}/me`, body);
  return response.data;
};

export const getCourseProgress = async (
  courseId: string
): Promise<GetCourseProgressResponse> => {
  const response = await axiosClient.get(`${BASE_URL}/${courseId}/progress`);
  return response.data;
};
