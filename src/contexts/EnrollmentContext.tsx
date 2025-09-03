"use client";

import { createContext, useMemo } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useGetMyEnrollments } from "@/hooks/api/student/use-enrollments-api";
import { Enrollment } from "@/types/enrollments";

export type EnrollmentContextType = {
  enrollments: Enrollment[];
};

export const EnrollmentContext = createContext<EnrollmentContextType>({
  enrollments: [],
});

export const EnrollmentProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { authFor, user } = useAuth();
  const enableEnrollmentsQuery = useMemo(() => {
    return authFor === "student" && !!user;
  }, [authFor, user]);

  const { data: enrollmentsData } = useGetMyEnrollments({
    enabled: enableEnrollmentsQuery,
  });
  const enrollments = useMemo(
    () => enrollmentsData?.data ?? [],
    [enrollmentsData]
  );

  const contextValue = useMemo(
    () => ({
      enrollments,
    }),
    [enrollments]
  );

  return (
    <EnrollmentContext.Provider value={contextValue}>
      {children}
    </EnrollmentContext.Provider>
  );
};
