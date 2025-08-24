import { Plus } from "lucide-react";
import Link from "next/link";
import { cookies } from "next/headers";
import { COOKIE_KEYS } from "@/config/storage";
import { API_BASE_URL } from "@/config/api";
import { queryParams } from "@/lib/query-params";
import { Button } from "@/components/ui/button";
import CategoryList from "@/components/admin/categories/category-list";
import { GetCourseCategoryRequest } from "@/types/dto/course-category-request";
import { GetCourseCategoryResponse } from "@/types/dto/course-category-response";

async function getCourseCategories(
  query: GetCourseCategoryRequest
): Promise<GetCourseCategoryResponse> {
  const cookieStore = await cookies();
  const urlSearch = queryParams(query);
  const url = `${API_BASE_URL}/v1/admin/categories?${urlSearch.toString()}`;

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
    throw new Error("Failed to fetch course categories");
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

export default async function AdminCategoriesPage(props: Props) {
  const searchParams = await props.searchParams;
  const q = searchParams?.q;
  const page = searchParams?.page;
  const perPage = searchParams?.perPage;

  const { data: categories } = await getCourseCategories({ q, page, perPage });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Course Categories
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage and organize your course categories
          </p>
        </div>
        <Link href="/admin/categories/create">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Category
          </Button>
        </Link>
      </div>

      <CategoryList categories={categories} />
    </div>
  );
}
