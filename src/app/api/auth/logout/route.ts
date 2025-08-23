import { NextRequest, NextResponse } from "next/server";
import { axiosServer } from "@/lib/axios.server";
import { API_BASE_URL } from "@/config/api";

export async function POST(request: NextRequest) {
  const response = await axiosServer.post(`${API_BASE_URL}/v1/auth/logout`);

  console.log("From this logout API route");
  console.table(request.headers);
  console.table(response.headers);
  console.table(response.data);

  return NextResponse.json(response.data, { status: 200 });
}
