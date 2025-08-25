import { Plus, Edit, Trash2, Eye, BookOpen, Users, Clock } from "lucide-react";
import { cookies } from "next/headers";
import { API_BASE_URL } from "@/config/api";
import { COOKIE_KEYS } from "@/config/storage";
import { queryParams } from "@/lib/query-params";
import { Button } from "@/components/ui/button";
import { CourseList } from "@/components/admin/courses/course-list";
import { GetCoursesRequest } from "@/types/dto/course-request";
import { GetCoursesResponse } from "@/types/dto/course-response";

async function getCourses(
  query: GetCoursesRequest
): Promise<GetCoursesResponse> {
  const cookieStore = await cookies();
  const urlSearch = queryParams(query);
  const url = `${API_BASE_URL}/v1/admin/courses?${urlSearch.toString()}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${
        cookieStore.get(COOKIE_KEYS.accessToken)?.value
      }`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch courses");
  }

  return response.json();
}

type Props = {
  searchParams?: Promise<{
    q?: string;
    page?: string;
    perPage?: string;
  }>;
};

export default async function AdminCoursesPage(props: Props) {
  const searchParams = await props.searchParams;
  const q = searchParams?.q;
  const page = searchParams?.page;
  const perPage = searchParams?.perPage;

  const { data: courses } = await getCourses({ q, page, perPage });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Courses
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage all courses in your LMS
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Course
        </Button>
      </div>

      <CourseList courses={courses} />
    </div>
  );
}
