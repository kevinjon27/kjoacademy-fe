"use server";
import { cookies } from "next/headers";
import { COOKIE_KEYS } from "@/config/storage";
import { User } from "@/types/user";

export async function getAuthData(): Promise<null | {
  accessToken: string;
  user: Omit<User, "id"> | null;
}> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(COOKIE_KEYS.accessToken);
  const userData = cookieStore.get(COOKIE_KEYS.userData);

  if (!accessToken || !userData) {
    return null;
  }

  return {
    accessToken: accessToken.value,
    user: userData.value ? JSON.parse(userData.value) : null,
  };
}
