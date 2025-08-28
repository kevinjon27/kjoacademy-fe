export const lessonsQueryKey = {
  all: ["lessons"] as const,
  lists: () => [...lessonsQueryKey.all, "list"] as const,
  list: (params: { q?: string; page?: number; perPage?: number }) =>
    [...lessonsQueryKey.lists(), params] as const,
  details: (id: string) => [...lessonsQueryKey.all, id] as const,
  detail: (id: string) => [...lessonsQueryKey.details(id)] as const,
};
