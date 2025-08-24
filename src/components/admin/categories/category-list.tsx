import CategoryCard from "@/components/admin/categories/category-card";
import { CourseCategory } from "@/types/course";

export default async function CategoryList({
  categories = [],
}: {
  categories: CourseCategory[];
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category) => (
        <CategoryCard
          key={`cat-${category.slug}-${category.id}`}
          category={category}
        />
      ))}
    </div>
  );
}
