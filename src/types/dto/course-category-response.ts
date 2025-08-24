import { PaginatedResponse } from "@/types/dto/paginated-response";
import { CourseCategory } from "@/types/course-category";

export type GetCourseCategoryResponse = PaginatedResponse<CourseCategory>;

export type CreateCourseCategoryResponse = {
  message: string;
  data: CourseCategory;
};

export type UpdateCourseCategoryResponse = {
  message: string;
  data: CourseCategory;
};
