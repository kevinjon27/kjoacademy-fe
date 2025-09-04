import { Enrollment } from "@/types/enrollments";
import { CourseProgress } from "@/types/enrollments";

export type GetMyEnrollmentsResponse = {
  data: Enrollment[];
};

export type EnrollCourseResponse = {
  message: string;
  data: Enrollment;
};

export type GetCourseProgressResponse = {
  data: CourseProgress;
};
