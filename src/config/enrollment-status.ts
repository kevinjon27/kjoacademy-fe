export const enrollmentStatus = {
  ENROLLED: "enrolled",
  IN_PROGRESS: "in_progress",
  COMPLETED: "completed",
} as const;

export type EnrollmentStatus =
  (typeof enrollmentStatus)[keyof typeof enrollmentStatus];
