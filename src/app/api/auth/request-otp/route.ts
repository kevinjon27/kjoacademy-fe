/**
 * POST /api/auth/request-otp
 * body: { identifier, purpose }
 * response: { message: string, otp: string }
 *
 * this route requests an OTP for the given identifier and purpose
 * and returns the OTP.
 *
 * Currently only handles login OTP
 */
import { NextRequest, NextResponse } from "next/server";
import { axiosServer } from "@/lib/axios.server";
import { API_BASE_URL } from "@/config/api";

export async function POST(request: NextRequest) {
  try {
    const { phone, purpose } = await request.json();
    const response = await axiosServer.post(
      `${API_BASE_URL}/v1/auth/request-otp`,
      { phone, purpose }
    );
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.error("Error requesting OTP", error);
    return NextResponse.json(
      { error, message: "Failed to request OTP" },
      { status: 400 }
    );
  }
}
