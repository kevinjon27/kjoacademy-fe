import { PaginatedRequest } from "@/types/dto/paginated-request";

export type GetModulesRequest = PaginatedRequest;

export type CreateModuleRequest = {
  course_id: string;
  title: string;
  is_published: boolean;
};

export type UpdateModuleRequest = {
  course_id: string;
  title: string;
  is_published: boolean;
};
