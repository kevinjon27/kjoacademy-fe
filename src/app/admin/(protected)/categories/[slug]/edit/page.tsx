import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { API_BASE_URL } from "@/config/api";
import { COOKIE_KEYS } from "@/config/storage";
import { CategoryForm } from "@/components/admin/categories/category-form";
import { CourseCategory } from "@/types/course-category";

interface EditCategoryPageProps {
  params: {
    slug: string;
  };
}

async function getCategoryData(slug: string): Promise<CourseCategory | null> {
  try {
    const cookieStore = await cookies();
    const response = await fetch(
      `${API_BASE_URL}/v1/admin/categories/${slug}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            cookieStore.get(COOKIE_KEYS.accessToken)?.value
          }`,
        },
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`Failed to fetch category: ${response.statusText}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching category:", error);
    return null;
  }
}

export default async function EditCategoryPage({
  params,
}: EditCategoryPageProps) {
  const categoryData = await getCategoryData(params.slug);

  if (!categoryData) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Edit Category</h1>
        <p className="text-gray-600 mt-2">
          Update the course category information.
        </p>
      </div>

      <CategoryForm isEdit={true} categoryData={categoryData} />
    </div>
  );
}
