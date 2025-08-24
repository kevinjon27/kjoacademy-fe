export function queryParams(params: Record<string, unknown>): string {
  const processedParams: Record<string, string> = Object.entries(params).reduce(
    (acc: Record<string, string>, curr: [string, unknown]) => {
      if (curr[1] !== undefined) {
        acc[curr[0]] = `${curr[1]}`;
      }
      return acc;
    },
    {}
  );

  return new URLSearchParams(processedParams).toString();
}
