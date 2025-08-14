export type CourseCategory = {
  id: number;
  title: string;
  slug: string;
  description: string;
  courses_count: number;
};

export type Course = {
  id: number;
  title: string;
  slug: string;
  thumbnail_url: string;
  bg_img_url: string;
  enrolled_count: number;
};

export type CourseModule = {
  id: number;
  title: string;
  lectures_count: number;
  duration_seeconds: number;
};

export type CourseLecture = {
  id: number;
  title: string;
  media_url: string;
  media_type: "video" | "imaeg" | "audio";
  duration_seconds: number;
};
