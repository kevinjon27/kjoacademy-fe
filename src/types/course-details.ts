import { Course } from "@/types/course";

export type CourseDetailsModule = {
  id: string;
  title: string;
  order: number;
  lessons_count: number;
  duration_seconds: number;
  is_published: boolean;
  lessons: CourseDetailsLesson[];
};

export type CourseDetailsLesson = {
  id: string;
  title: string;
  order: number;
  lesson_type: string;
  lesson_content_url: string;
  duration_seconds: number;
  is_published: boolean;
};

export type CourseDetails = Course & {
  modules: CourseDetailsModule[];
};
