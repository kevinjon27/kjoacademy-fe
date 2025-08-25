import { PaginatedResponse } from "@/types/dto/paginated-response";
import { Course } from "@/types/course";

export type GetCoursesResponse = PaginatedResponse<Course>;

export type CreateCourseResponse = {
  message: string;
  data: Course;
};

export type UpdateCourseResponse = {
  message: string;
  data: Course;
};
