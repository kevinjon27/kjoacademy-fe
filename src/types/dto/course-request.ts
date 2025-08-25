import { PaginatedRequest } from "@/types/dto/paginated-request";

export type GetCoursesRequest = PaginatedRequest;

export type GetCoursesByCategorySlugRequest = PaginatedRequest;

export type CreateCourseRequest = {
  title: string;
  category_id: string;
  slug: string;
  description: string;
  thumbnail_url: string;
  is_published: boolean;
};

export type UpdateCourseRequest = {
  title: string;
  category_id: string;
  slug: string;
  description: string;
  thumbnail_url: string;
  is_published: boolean;
};
