import { Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import CategoryList from "@/components/admin/categories/category-list";

type Props = {
  searchParams?: Promise<{
    q?: string;
    page?: string;
    perPage?: string;
  }>;
};

export default async function AdminCategoriesPage(props: Props) {
  const searchParams = await props.searchParams;
  const q = searchParams?.q || "";
  const page = searchParams?.page || "1";
  const perPage = searchParams?.perPage;

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

      <CategoryList q={q} page={page} perPage={perPage} />
    </div>
  );
}
