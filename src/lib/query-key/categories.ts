export const categoriesQueryKey = {
  all: ["categories"] as const,
  lists: () => [...categoriesQueryKey.all, "list"] as const,
  list: (params: { q?: string; page?: number; perPage?: number }) =>
    [...categoriesQueryKey.lists(), params] as const,
  details: (slug: string) => [...categoriesQueryKey.all, slug] as const,
  detail: (slug: string) => [...categoriesQueryKey.details(slug)] as const,
};
