import { axiosClient } from "@/lib/axios.client";
import {
  GetModulesRequest,
  CreateModuleRequest,
  UpdateModuleRequest,
} from "@/types/dto/module-request";
import {
  GetModulesResponse,
  GetModuleByIdResponse,
  CreateModuleResponse,
  UpdateModuleResponse,
  DeleteModuleResponse,
} from "@/types/dto/module-response";

const BASE_URL = "/v1/admin/modules";

export const getModules = async (
  params: GetModulesRequest
): Promise<GetModulesResponse> => {
  const response = await axiosClient.get(BASE_URL, {
    params: params || {},
  });
  return response.data;
};

export const getModuleById = async (
  id: string
): Promise<GetModuleByIdResponse> => {
  const response = await axiosClient.get(`${BASE_URL}/${id}`);
  return response.data;
};

export const createModule = async (
  data: CreateModuleRequest
): Promise<CreateModuleResponse> => {
  const response = await axiosClient.post(BASE_URL, data);
  return response.data;
};

export const updateModule = async (
  id: string,
  data: UpdateModuleRequest
): Promise<UpdateModuleResponse> => {
  const response = await axiosClient.put(`${BASE_URL}/${id}`, data);
  return response.data;
};

export const deleteModule = async (
  id: string
): Promise<DeleteModuleResponse> => {
  const response = await axiosClient.delete(`${BASE_URL}/${id}`);
  return response.data;
};
