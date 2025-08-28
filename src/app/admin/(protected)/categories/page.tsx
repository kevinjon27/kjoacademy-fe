"use client";

import { Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { categoriesQueryKey } from "@/lib/query-key/categories";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CategoryCard } from "@/components/admin/categories/category-card";
import { getCourseCategories } from "@/api/admin/categories.api";

export default function AdminCategoriesPage() {
  const { data: categories = [], isLoading: isCategoriesLoading } = useQuery({
    queryKey: categoriesQueryKey.all,
    queryFn: async () => {
      const result = await getCourseCategories({});
      return result.data;
    },
  });

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isCategoriesLoading ? (
          <div>Loading...</div>
        ) : (
          categories.map((category) => (
            <CategoryCard
              key={`cat-${category.slug}-${category.id}`}
              category={category}
            />
          ))
        )}
      </div>
    </div>
  );
}
