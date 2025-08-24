import { CategoryForm } from "@/components/admin/categories/category-form";

export default function CreateCategoryPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Create Category</h1>
        <p className="text-gray-600 mt-2">
          Add a new course category to organize your courses.
        </p>
      </div>
      
      <CategoryForm />
    </div>
  );
}