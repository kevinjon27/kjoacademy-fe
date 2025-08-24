import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, FolderOpen } from "lucide-react";
import { CourseCategory } from "@/types/course-category";

export type Props = {
  category: CourseCategory;
};

export function CategoryCard({ category, ...rest }: Props) {
  return (
    <Card className="hover:shadow-lg transition-shadow" {...rest}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 flex-1 min-w-0">
            <div className={`p-2 rounded-lg flex-shrink-0`}>
              <FolderOpen className="h-5 w-5" />
            </div>
            <CardTitle className="text-lg line-clamp-2">
              {category.title}
            </CardTitle>
          </div>
          <div className="flex items-center space-x-2 flex-shrink-0">
            <Link href={`/admin/categories/${category.slug}/edit`}>
              <Button variant="ghost" size="sm">
                <Edit className="h-4 w-4" />
              </Button>
            </Link>
            {/* <Button
              variant="ghost"
              size="sm"
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button> */}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="mb-4 line-clamp-2">
          {category.description}
        </CardDescription>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {category.courses_count} courses
          </span>
          <Button variant="outline" size="sm">
            View Courses
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default CategoryCard;
