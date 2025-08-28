import { PaginatedRequest } from "@/types/dto/paginated-request";

export type GetLessonsRequest = PaginatedRequest;

export type CreateLessonRequest = {
  course_module_id: string;
  title: string;
  lesson_type: string;
  lesson_content_url: string;
  duration_seconds: number;
  is_published: boolean;
};

export type UpdateLessonRequest = {
  course_module_id: string;
  title: string;
  lesson_type: string;
  lesson_content_url: string;
  duration_seconds: number;
  is_published: boolean;
};
