export const modulesQueryKey = {
  all: ["modules"] as const,
  lists: () => [...modulesQueryKey.all, "list"] as const,
  list: (params: { q?: string; page?: number; perPage?: number }) =>
    [...modulesQueryKey.lists(), params] as const,
  details: (id: string) => [...modulesQueryKey.all, id] as const,
  detail: (id: string) => [...modulesQueryKey.details(id)] as const,
};
