import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, FolderOpen } from "lucide-react";

export default function AdminCategoriesPage() {
  const categories = [
    {
      id: 1,
      name: "Web Development",
      description: "Learn modern web development technologies",
      courseCount: 8,
      color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    },
    {
      id: 2,
      name: "Mobile Development",
      description: "Build mobile applications for iOS and Android",
      courseCount: 5,
      color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    },
    {
      id: 3,
      name: "Data Science",
      description: "Master data analysis and machine learning",
      courseCount: 6,
      color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    },
    {
      id: 4,
      name: "Design & UX",
      description: "Create beautiful and user-friendly interfaces",
      courseCount: 4,
      color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    },
    {
      id: 5,
      name: "DevOps & Cloud",
      description: "Learn deployment and infrastructure management",
      courseCount: 3,
      color: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
    },
  ];

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
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Card key={category.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className={`p-2 rounded-lg ${category.color}`}>
                    <FolderOpen className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-lg">{category.name}</CardTitle>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">
                {category.description}
              </CardDescription>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {category.courseCount} courses
                </span>
                <Button variant="outline" size="sm">
                  View Courses
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Category Statistics</CardTitle>
          <CardDescription>
            Overview of your course categories
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">5</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Total Categories</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">26</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Total Courses</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">8</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Most Popular</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">3</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Least Popular</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
