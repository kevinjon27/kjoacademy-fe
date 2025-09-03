import { Enrollment } from "@/types/enrollments";

export type GetMyEnrollmentsResponse = {
  data: Enrollment[];
};

export type EnrollCourseResponse = {
  message: string;
  data: Enrollment;
};
