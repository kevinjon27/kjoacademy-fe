import { axiosClient } from "@/lib/axios.client";
import { GetMeResponse } from "@/types/dto/user-response";

const BASE_URL = "/v1/users/me";

export const getMe = async (): Promise<GetMeResponse> => {
  const response = await axiosClient.get(BASE_URL);
  return response.data;
};
