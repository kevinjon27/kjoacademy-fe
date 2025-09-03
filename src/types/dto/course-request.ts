import { PaginatedRequest } from "@/types/dto/paginated-request";

export type GetCoursesRequest = PaginatedRequest & { category?: string };

export type CreateCourseRequest = {
  title: string;
  categories: string[];
  slug: string;
  description: string;
  thumbnail_url: string;
  is_published: boolean;
  modules: {
    title: string;
    duration_seconds?: number;
    lessons: {
      title: string;
      lesson_type: string;
      lesson_content_url: string;
      duration_seconds: number;
    }[];
  }[];
};

export type UpdateCourseRequest = {
  title: string;
  categories: string[];
  slug: string;
  description: string;
  thumbnail_url: string;
  is_published: boolean;
  modules: {
    title: string;
    duration_seconds?: number;
    lessons: {
      title: string;
      lesson_type: string;
      lesson_content_url: string;
      duration_seconds: number;
    }[];
  }[];
};
