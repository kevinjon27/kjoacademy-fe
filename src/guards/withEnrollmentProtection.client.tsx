"use client";

import { useMemo } from "react";
import { useEnrollment } from "@/hooks/useEnrollment";

export const useEnrollmentStatus = ({ slug }: { slug: string }) => {
  const { enrollments } = useEnrollment();

  const isEnrolled = useMemo<boolean>(() => {
    if (enrollments.length) {
      return enrollments.some((enrollment) => enrollment.course.slug === slug);
    }
    return false;
  }, [enrollments, slug]);

  return isEnrolled;
};
