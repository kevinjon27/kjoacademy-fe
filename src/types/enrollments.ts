import { EnrollmentStatus } from "@/config/enrollment-status";

export type Enrollment = {
  id: number;
  course: {
    id: string;
  };
  status: EnrollmentStatus;
  progress_percentage: number;
  enrolled_at: string;
  completed_at: string | null;
  last_accessed_at: string | null;
};
