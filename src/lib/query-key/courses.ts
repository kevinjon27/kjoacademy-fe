export const coursesQueryKey = {
  all: ["courses"] as const,
  lists: () => [...coursesQueryKey.all, "list"] as const,
  list: (params: {
    q?: string;
    page?: number;
    perPage?: number;
    category?: string;
  }) => [...coursesQueryKey.lists(), params] as const,
  details: (slug: string) => [...coursesQueryKey.all, slug] as const,
  detail: (slug: string) => [...coursesQueryKey.details(slug)] as const,
};
