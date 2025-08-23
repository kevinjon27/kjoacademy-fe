import CategoryCard from "@/components/admin/categories/category-card";
import { getCourseCategories } from "@/api/admin/course-category.server";

export default async function CategoryList({
  q,
  page,
  perPage,
}: {
  q?: string;
  page?: string;
  perPage?: string;
}) {
  const { data: categories } = await getCourseCategories({ q, page, perPage });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.data.map((category) => (
        <CategoryCard
          key={`cat-${category.slug}-${category.id}`}
          category={category}
        />
      ))}
    </div>
  );
}
