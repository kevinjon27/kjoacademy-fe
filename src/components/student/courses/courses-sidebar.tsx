"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { categoriesQueryKey } from "@/lib/query-key/categories";
import { getCourseCategories } from "@/api/student/categories.api";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useGetCourseCategories } from "@/hooks/api/student/use-categories-api";
import { CourseCategory } from "@/types/course";

function RenderSkeleton() {
  return Array.from({ length: 5 }).map((_, index) => (
    <Skeleton key={`cat-menu-skeleton-${index}`} className="h-[36px] w-full" />
  ));
}

function RenderCategories({
  categories,
  setIsOpen,
}: {
  categories: CourseCategory[];
  setIsOpen?: (isOpen: boolean) => void;
}) {
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
      onClick={() => {
        setIsOpen && setIsOpen(false);
      }}
    >
      {category.title}
    </Link>
  ));
}

function SidebarContent({
  categories,
  isCategoriesLoading,
}: {
  categories: CourseCategory[];
  isCategoriesLoading: boolean;
}) {
  return (
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
  );
}

export function CoursesSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const { data: categoriesData, isLoading: isCategoriesLoading } =
    useGetCourseCategories();
  const categories = useMemo(
    () => categoriesData?.data || [],
    [categoriesData]
  );

  // const { data: categories = [], isLoading: isCategoriesLoading } = useQuery({
  //   queryKey: categoriesQueryKey.all,
  //   queryFn: async () => {
  //     const result = await getCourseCategories({});
  //     return result.data;
  //   },
  // });

  return (
    <>
      {/* Mobile Toggle Button - visible on small screens */}
      <div className="lg:hidden p-4 border-b border-border">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="lg"
              className="w-full justify-start"
            >
              <Menu className="mr-2 h-4 w-4" />
              Course Categories
            </Button>
          </DialogTrigger>
          <DialogContent
            className="w-[420px] px-2"
            onOpenAutoFocus={(e) => e.preventDefault()}
          >
            <DialogHeader>
              <DialogTitle>Course Categories</DialogTitle>
            </DialogHeader>
            <nav className="space-y-2">
              {isCategoriesLoading ? (
                <RenderSkeleton />
              ) : (
                <RenderCategories
                  categories={categories}
                  setIsOpen={setIsOpen}
                />
              )}
            </nav>
          </DialogContent>
        </Dialog>
      </div>

      {/* Desktop Sidebar - hidden on small screens */}
      <aside className="hidden lg:block w-64 min-h-screen bg-card border-r border-border">
        <SidebarContent
          categories={categories}
          isCategoriesLoading={isCategoriesLoading}
        />
      </aside>
    </>
  );
}
