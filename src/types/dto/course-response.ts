import { PaginatedResponse } from "@/types/dto/paginated-response";
import { Course, CourseDetails } from "@/types/course";

export type GetCoursesResponse = PaginatedResponse<Course>;

export type GetCourseResponse = {
  message: string;
  data: Course;
};

export type GetCourseBySlugResponse = {
  data: CourseDetails;
};

export type CreateCourseResponse = {
  message: string;
  data: CourseDetails;
};

export type UpdateCourseResponse = {
  message: string;
  data: CourseDetails;
};

export type DeleteCourseResponse = {
  message: string;
};
