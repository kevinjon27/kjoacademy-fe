"use client";

import { useQuery } from "@tanstack/react-query";
import { userQueryKey } from "@/lib/query-key/user";
import { getMe as getAdminMe } from "@/api/admin/user.api";
import { getMe as getStudentMe } from "@/api/student/user.api";

export function useGetCurrentUser({
  enabled,
  authFor,
}: {
  enabled: boolean;
  authFor: "admin" | "student";
}) {
  return useQuery({
    enabled,
    queryKey: userQueryKey.me,
    queryFn: async () => {
      const result = await (authFor === "admin" ? getAdminMe : getStudentMe)();
      return result;
    },
    staleTime: 1000 * 60 * 5,
  });
}
