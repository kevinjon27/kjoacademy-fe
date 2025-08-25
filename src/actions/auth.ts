"use server";

import { API_BASE_URL } from "@/config/api";
import { cookies } from "next/headers";
import { COOKIE_KEYS } from "@/config/storage";

const BASE_URL = `${API_BASE_URL}/v1/auth`;

export async function requestLoginOTP(
  phone: string,
  purpose: "admin-login" | "student-login"
) {
  const response = await fetch(`${BASE_URL}/request-otp`, {
    method: "POST",
    body: JSON.stringify({
      phone,
      purpose,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    return {
      message: "Error when sending OTP",
    };
  }

  return {
    message: "OTP sent successfully",
  };
}

export async function signInWithOtp(
  phone: string,
  otp: string,
  purpose: "admin-login" | "student-login"
) {
  const response = await fetch(`${BASE_URL}/verify-otp`, {
    method: "POST",
    body: JSON.stringify({
      phone,
      otp,
      purpose,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    return {
      message: "Error when verifying OTP",
    };
  }

  const responseData = await response.json();

  // Set the access token cookie directly in the server action
  if (responseData.access_token) {
    const cookieStore = await cookies();
    // currently like this because access token needs to be accessible for the client side axios
    cookieStore.set(COOKIE_KEYS.accessToken, responseData.access_token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    const { id, ...rest } = responseData.user;
    cookieStore.set(COOKIE_KEYS.userData, JSON.stringify(rest), {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    return {
      message: "OTP Verified. Login success",
      access_token: responseData.access_token,
      user: responseData.user,
    };
  }

  return null;
}

export async function signOut() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(COOKIE_KEYS.accessToken)?.value;
  const response = await fetch(`${BASE_URL}/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    return {
      message: "Error when logging out",
    };
  }

  // remove auth data from cookies
  cookieStore.delete(COOKIE_KEYS.accessToken);
  cookieStore.delete(COOKIE_KEYS.userData);

  return {
    message: "Logged Out",
  };
}
