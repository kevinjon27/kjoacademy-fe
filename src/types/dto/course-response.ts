import { PaginatedResponse } from "@/types/dto/paginated-response";
import { Course } from "@/types/course";
import { CourseDetails } from "@/types/course-details";

export type GetCoursesResponse = PaginatedResponse<Course>;

export type GetCoursesByCategorySlugResponse = PaginatedResponse<Course>;

export type GetCourseResponse = {
  message: string;
  data: Course;
};

export type GetCourseBySlugResponse = {
  data: CourseDetails;
};

export type CreateCourseResponse = {
  message: string;
  data: Course;
};

export type UpdateCourseResponse = {
  message: string;
  data: Course;
};

export type DeleteCourseResponse = {
  message: string;
};
