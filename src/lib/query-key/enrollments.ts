export const enrollmentsQueryKey = {
  all: ["enrollments"] as const,
  me: () => [...enrollmentsQueryKey.all, "me"] as const,
};
