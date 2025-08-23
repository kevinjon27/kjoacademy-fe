import { PaginatedRequest } from "@/types/dto/paginated-request";

export type GetCourseCategoryRequest = PaginatedRequest;

export type CreateCourseCategoryRequest = {
  title: string;
  slug: string;
  description: string;
};
