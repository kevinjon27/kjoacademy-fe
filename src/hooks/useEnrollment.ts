"use client";
import { useContext } from "react";
import { EnrollmentContext, EnrollmentContextType } from "@/contexts/EnrollmentContext";

export function useEnrollment(): EnrollmentContextType {
  const enrollmentCtx = useContext(EnrollmentContext);
  if (enrollmentCtx === undefined) {
    throw new Error("useEnrollment must be used within an EnrollmentProvider");
  }

  return enrollmentCtx as EnrollmentContextType;
}
