import { axiosServerNext } from "@/lib/axios.server";
import { NEXT_PUBLIC_API_ROUTE_URL } from "@/config/api";
import { cookies } from "next/headers";
import { COOKIE_KEYS } from "@/config/storage";
// import { redirect } from "next/navigation";

export async function requestLoginOTP(phone: string) {
  "use server";
  const response = await axiosServerNext.post(
    `${NEXT_PUBLIC_API_ROUTE_URL}/auth/request-otp`,
    {
      phone,
      purpose: "student-login",
    }
  );

  console.log("response from request login with otp student");
  console.table(response.data);
}

export async function signInWithOtp(phone: string, otp: string) {
  "use server";
  const response = await axiosServerNext.post(
    `${NEXT_PUBLIC_API_ROUTE_URL}/auth/verify-otp`,
    {
      phone,
      otp,
      purpose: "student-login",
    }
  );

  console.log("response from verify login with otp student");
  console.table(response.data);

  // Set the access token cookie directly in the server action
  if (response.data.access_token) {
    const cookieStore = await cookies();
    cookieStore.set(COOKIE_KEYS.accessToken, response.data.access_token, {
      httpOnly: true,
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
