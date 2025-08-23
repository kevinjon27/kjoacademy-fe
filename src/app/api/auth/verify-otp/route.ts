/**
 * POST /api/auth/verify-otp
 * body: { identifier, otp, purpose}
 * response: { message: string, access_token: string }
 *
 * this route verifies the OTP and returns an access token
 * that can be used to authenticate the user.
 */
import { NextRequest, NextResponse } from "next/server";
import { axiosServer } from "@/lib/axios.server";
import { API_BASE_URL } from "@/config/api";

export async function POST(request: NextRequest) {
  try {
    const { phone, otp, purpose } = await request.json();

    const response = await axiosServer.post(
      `${API_BASE_URL}/v1/auth/verify-otp`,
      {
        phone,
        otp: otp,
        purpose,
      }
    );

    console.log("From this verify otp");
    console.table(request.headers);
    console.table(response.headers);
    console.table(response.data);

    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { error, message: "Failed to verify OTP" },
      { status: 400 }
    );
  }
}
