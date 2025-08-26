import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { humanizeDuration } from "@/lib/time";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, BookOpen, Users, Clock } from "lucide-react";
import { Course } from "@/types/course";

export type Props = {
  course: Course;
  onDeleteClick: (course: Course) => void;
};

export function CourseCard({ course, onDeleteClick }: Props) {
  return (
    <Card key={course.id} className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {/* <div className="p-2 rounded-lg bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              <BookOpen className="h-5 w-5" />
            </div> */}
            <div>
              <CardTitle className="text-lg line-clamp-1">
                {course.title}
              </CardTitle>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {course.category.title}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Link href={`/admin/courses/${course.slug}/edit`}>
              <Button variant="ghost" size="sm">
                <Edit className="h-4 w-4" />
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              className="text-red-600 hover:text-red-700"
              onClick={() => onDeleteClick(course)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="mb-4 line-clamp-2">
          {course.description}
        </CardDescription>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">Students:</span>
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4 text-gray-400" />
              <span className="font-medium text-gray-900 dark:text-white">
                {course.enrollment_count}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">Duration:</span>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4 text-gray-400" />
              <span className="font-medium text-gray-900 dark:text-white">
                {humanizeDuration(course.duration_seconds)}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">Modules:</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {course.modules_count}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <Badge
              className={
                course.is_published
                  ? "bg-success-500 text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }
            >
              {course.is_published ? "Published" : "Not Published"}
            </Badge>
            <Button variant="outline" size="sm">
              Manage
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
