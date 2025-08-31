"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { categoriesQueryKey } from "@/lib/query-key/categories";
import { getCourseCategories } from "@/api/student/categories.api";
import { Skeleton } from "@/components/ui/skeleton";
import { CourseCategory } from "@/types/course";

function RenderSkeleton() {
  return Array.from({ length: 5 }).map((_, index) => (
    <Skeleton key={`cat-menu-skeleton-${index}`} className="h-[36px] w-full" />
  ));
}

function RenderCategories({ categories }: { categories: CourseCategory[] }) {
  const menu = [
    {
      id: "all-courses",
      title: "All Courses",
      slug: "",
    },
    ...categories.map((category) => ({
      id: category.id,
      title: category.title,
      slug: category.slug,
    })),
  ];

  return menu.map((category) => (
    <Link
      key={`cat-menu-${category.id}`}
      href={
        category.id === "all-courses" ? "/courses" : `/courses/${category.slug}`
      }
      className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
    >
      {category.title}
    </Link>
  ));
}

export function CoursesSidebar() {
  const { data: categories = [], isLoading: isCategoriesLoading } = useQuery({
    queryKey: categoriesQueryKey.all,
    queryFn: async () => {
      const result = await getCourseCategories({});
      return result.data;
    },
  });

  return (
    <aside className="w-64 min-h-screen bg-card border-r border-border">
      <div className="p-6">
        <h2 className="text-md font-semibold text-foreground mb-6">
          Course Categories
        </h2>
        <nav className="space-y-2">
          {isCategoriesLoading ? (
            <RenderSkeleton />
          ) : (
            <RenderCategories categories={categories} />
          )}
        </nav>
      </div>
    </aside>
  );
}
