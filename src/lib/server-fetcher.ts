import { cookies } from "next/headers";
import { COOKIE_KEYS } from "@/config/storage";

export async function serverFetcher(url: string, options: RequestInit) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(COOKIE_KEYS.accessToken)?.value;

  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    },
  });
}
