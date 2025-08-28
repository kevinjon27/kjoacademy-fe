import { PaginatedResponse } from "@/types/dto/paginated-response";
import { CourseLesson } from "@/types/course";

export type GetLessonsResponse = PaginatedResponse<CourseLesson>;

export type GetLessonByIdResponse = {
  data: CourseLesson;
};

export type CreateLessonResponse = {
  message: string;
  data: CourseLesson;
};

export type UpdateLessonResponse = {
  message: string;
  data: CourseLesson;
};

export type DeleteLessonResponse = {
  message: string;
};
