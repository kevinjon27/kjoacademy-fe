import { humanizeDuration } from "@/lib/time";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Eye, FileText, Play, Clock } from "lucide-react";
import { CourseLesson, CourseLessonTypes } from "@/types/course";

export type Props = {
  lesson: CourseLesson;
  onDeleteClick: (module: CourseLesson) => void;
};

export function LessonCard({ lesson, onDeleteClick }: Props) {
  const getStatusColor = (isPublished: boolean) => {
    if (isPublished) {
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    }
    return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
  };

  const getTypeIcon = (type: CourseLessonTypes) => {
    switch (type) {
      case CourseLessonTypes.VIDEO:
        return <Play className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <Card key={lesson.id} className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-lg">
              {getTypeIcon(lesson.lesson_type as CourseLessonTypes)}
            </div>
            <div>
              <CardTitle className="text-lg">{lesson.title}</CardTitle>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {lesson.module.title}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="sm">
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-red-600 hover:text-red-700"
              onClick={() => onDeleteClick(lesson)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">Module:</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {lesson.module.title}
            </span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">Type:</span>
            <span className="font-medium text-gray-900 dark:text-white capitalize">
              {lesson.lesson_type}
            </span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">Duration:</span>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4 text-gray-400" />
              <span className="font-medium text-gray-900 dark:text-white">
                {humanizeDuration(lesson.duration_seconds)}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                lesson.is_published
              )}`}
            >
              {lesson.is_published ? "Published" : "Unpublished"}
            </span>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                Preview
              </Button>
              <Button variant="outline" size="sm">
                Edit
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
