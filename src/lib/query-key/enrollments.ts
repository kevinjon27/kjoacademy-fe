export const enrollmentsQueryKey = {
  all: ["enrollments"] as const,
  me: () => [...enrollmentsQueryKey.all, "me"] as const,
  courseProgress: (courseId: string) =>
    [...enrollmentsQueryKey.me(), "courseProgress", courseId] as const,
};
