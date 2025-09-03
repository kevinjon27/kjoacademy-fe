import { axiosClient } from "@/lib/axios.client";
import { GetMyEnrollmentsResponse } from "@/types/dto/student/enrollment-response";

const BASE_URL = "/v1/enrollments";

export const getMyEnrollments = async (): Promise<GetMyEnrollmentsResponse> => {
  const response = await axiosClient.get(`${BASE_URL}/me`);
  return response.data;
};
