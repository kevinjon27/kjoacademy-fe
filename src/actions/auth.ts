"use server";

import { axiosServer } from "@/lib/axios.server";
import { API_BASE_URL } from "@/config/api";
import { cookies } from "next/headers";
import { COOKIE_KEYS } from "@/config/storage";

const BASE_URL = `${API_BASE_URL}/v1/auth`;

export async function requestLoginOTP(
  phone: string,
  purpose: "admin-login" | "student-login"
) {
  const response = await axiosServer.post(`${BASE_URL}/request-otp`, {
    phone,
    purpose,
  });

  console.log("response from request login with otp admin");
  console.table(response.data);
}

export async function signInWithOtp(
  phone: string,
  otp: string,
  purpose: "admin-login" | "student-login"
) {
  const response = await axiosServer.post(`${BASE_URL}/verify-otp`, {
    phone,
    otp,
    purpose,
  });

  console.log("response from verify login with otp admin");
  console.table(response.data);

  // Set the access token cookie directly in the server action
  if (response.data.access_token) {
    const cookieStore = await cookies();
    // currently like this because access token need to be accessible for the client side axios
    cookieStore.set(COOKIE_KEYS.accessToken, response.data.access_token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    const { id, ...rest } = response.data.user;
    cookieStore.set(COOKIE_KEYS.userData, JSON.stringify(rest), {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    return {
      access_token: response.data.access_token,
      user: response.data.user,
    };
  }

  return null;
}

export async function signOut() {
  try {
    await axiosServer.post(`${API_BASE_URL}/v1/auth/logout`);
    // remove auth data from cookies
    const cookieStore = await cookies();
    cookieStore.delete(COOKIE_KEYS.accessToken);
    cookieStore.delete(COOKIE_KEYS.userData);
  } catch (error) {
    console.error("Sign out error:", error);
    throw error;
  }
}
