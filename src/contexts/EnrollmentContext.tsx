"use client";

import { createContext, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { enrollmentsQueryKey } from "@/lib/query-key/enrollments";
import { useAuth } from "@/hooks/useAuth";
import { getMyEnrollments } from "@/api/student/enrollments.api";
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

  const { data: enrollments = [] } = useQuery({
    enabled: enableEnrollmentsQuery,
    queryKey: enrollmentsQueryKey.all,
    queryFn: async () => {
      const result = await getMyEnrollments();
      return result.data;
    },
    staleTime: 60 * 5 * 1000,
  });

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
