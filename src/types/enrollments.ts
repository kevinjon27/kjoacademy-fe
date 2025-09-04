import { EnrollmentStatus } from "@/config/enrollment-status";

export type Enrollment = {
  id: number;
  course: {
    id: string;
    slug: string;
  };
  status: EnrollmentStatus;
  progress_percentage: number;
  enrolled_at: string;
  completed_at: string | null;
  last_accessed_at: string | null;
};

export type ModuleProgressStatus = 'not_started' | 'in_progress' | 'completed';

export type LessonProgressStatus = 'not_started' | 'in_progress' | 'completed';

export type ModuleProgress = {
  status: ModuleProgressStatus;
  progress_percentage: number;
  lessons_completed_count: number;
  started_at: string | null;
  completed_at: string | null;
};

export type Module = {
  id: string;
  title: string;
  order: number;
  duration_seconds: number;
  progress: ModuleProgress;
  lessons: Lesson[];
};


export type LessonProgress = {
  status: LessonProgressStatus;
  time_spent_seconds: number;
  video_progress_seconds: number;
  started_at: string | null;
  completed_at: string | null;
  last_accessed_at: string | null;
};

export type Lesson = {
  id: string;
  title: string;
  order: number;
  lesson_type: string;
  lesson_content_url: string;
  duration_seconds: number;
  progress: LessonProgress;
};

export type OverallProgress = {
  status: EnrollmentStatus;
  progress_percentage: number;
  enrolled_at: string;
  completed_at: string | null;
  last_accessed_at: string | null;
};

export type CourseProgress = {
  id: string;
  course: {
    id: string;
    title: string;
    slug: string;
  };
  overall_progress: OverallProgress;
  modules: Module[];
};
