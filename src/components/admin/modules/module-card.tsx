"use client";

import { Edit, Trash2, Layers, Clock, FileText } from "lucide-react";
import { humanizeDuration } from "@/lib/time";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CourseModule } from "@/types/course";

export type Props = {
  module: CourseModule;
  onDeleteClick: (module: CourseModule) => void;
};

export function ModuleCard({ module, onDeleteClick }: Props) {
  const getStatusColor = (isPublished: boolean) => {
    if (isPublished) {
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    }
    return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
  };

  return (
    <Card key={module.id} className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-lg bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
              <Layers className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-lg">{module.title}</CardTitle>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {module.course.title}
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
              onClick={() => onDeleteClick(module)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">Lessons:</span>
            <div className="flex items-center space-x-1">
              <FileText className="h-4 w-4 text-gray-400" />
              <span className="font-medium text-gray-900 dark:text-white">
                {module.lessons_count}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">Duration:</span>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4 text-gray-400" />
              <span className="font-medium text-gray-900 dark:text-white">
                {humanizeDuration(module.duration_seconds)}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                module.is_published
              )}`}
            >
              {module.is_published ? "Published" : "Unpublished"}
            </span>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                Lessons
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
