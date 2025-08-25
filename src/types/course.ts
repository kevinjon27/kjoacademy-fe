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
  category: {
    id: string;
    title: string;
    slug: string;
  };
  modules_count: number;
};

export type CourseModule = {
  id: string;
  course_id: string;
  title: string;
  lectures_count: number;
  duration_seeconds: number;
  course: {
    id: string;
    title: string;
    slug: string;
  };
  lessons_count: number;
};

export type CourseLesson = {
  id: string;
  course_module_id: string;
  title: string;
  media_url: string;
  media_type: "video/mp4" | "image/png" | "audio/mpeg";
  duration_seconds: number;
  module: {
    id: string;
    title: string;
  };
};
