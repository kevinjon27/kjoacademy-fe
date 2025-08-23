/**
 * Generates session id for user
 */
import { NextRequest, NextResponse } from "next/server";
import { COOKIE_KEYS } from "@/config/storage";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  console.log("handling cookie session ID");
  const cookieStore = await cookies();
  const deviceId = cookieStore.get(COOKIE_KEYS.deviceId)?.value;
  const sessionId = cookieStore.get(COOKIE_KEYS.sessionId)?.value;

  console.log("existing sessionID:", sessionId);
  console.log("existing deviceID:", deviceId);

  let newSessionId = sessionId;
  let newDeviceId = deviceId;

  // Generate sessionId if it doesn't exist
  if (!sessionId) {
    newSessionId = crypto.randomUUID();
    console.log("generating new sessionId:", newSessionId);
    cookieStore.set(COOKIE_KEYS.sessionId, newSessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      // domain: "member.kjoacademy.localhost",
    });
  }

  // Generate deviceId if it doesn't exist
  if (!deviceId) {
    newDeviceId = crypto.randomUUID();
    console.log("generating new deviceId:", newDeviceId);
    cookieStore.set(COOKIE_KEYS.deviceId, newDeviceId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 365, // 1 year
      // domain: "member.kjoacademy.localhost",
    });
  }

  return NextResponse.json({
    message: "Session and device IDs handled",
    sessionId: newSessionId,
    deviceId: newDeviceId,
    isNewSession: !sessionId,
    isNewDevice: !deviceId,
  });
}
