import { NextRequest, NextResponse } from "next/server";
import { axiosClient } from "@/lib/axios.client";
import { CreateCourseCategoryRequest } from "@/types/dto/course-category-request";

export async function POST(request: NextRequest) {
  try {
    const body: CreateCourseCategoryRequest = await request.json();
    
    const response = await axiosClient.post("/v1/admin/categories", body);
    
    return NextResponse.json(response.data, { status: 201 });
  } catch (error: any) {
    console.error("Error creating course category:", error);
    
    return NextResponse.json(
      {
        message: error.response?.data?.message || "Failed to create category",
        errors: error.response?.data?.errors || {},
      },
      { status: error.response?.status || 500 }
    );
  }
}
