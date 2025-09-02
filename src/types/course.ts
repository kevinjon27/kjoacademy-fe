export type CourseCategory = {
  id: string;
  title: string;
  slug: string;
  description: string;
  courses_count: string;
  created_at: string;
  updated_at: string;
};

export type Course = {
  id: string;
  title: string;
  slug: string;
  description: string;
  thumbnail_url: string;
  enrollment_count: number;
  duration_seconds: number;
  is_published: boolean;
  categories: {
    id: string;
    title: string;
    slug: string;
  }[];
  modules_count: number;
  lessons_count: number;
  created_at: string;
  updated_at: string;
};

export type CourseModule = {
  id: string;
  course_id: string;
  title: string;
  order: number;
  lessons_count: number;
  duration_seconds: number;
  is_published: boolean;
  course: {
    id: string;
    title: string;
    slug: string;
  };
  created_at: string;
  updated_at: string;
};

export type CourseLesson = {
  id: string;
  title: string;
  order: number;
  lesson_type: "video/mp4" | "image/png" | "audio/mpeg";
  lesson_content_url: string;
  duration_seconds: number;
  is_published: boolean;
  module: {
    id: string;
    title: string;
  };
  created_at: string;
  updated_at: string;
};

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

export enum CourseLessonTypes {
  VIDEO = "video/mp4",
  AUDIO = "audio/mp3",
}
