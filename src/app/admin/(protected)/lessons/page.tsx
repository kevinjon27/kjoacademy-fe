"use client";

import { useQuery } from "@tanstack/react-query";
import { lessonsQueryKey } from "@/lib/query-key/lessons";
import { LessonCard } from "@/components/admin/lessons/lesson-card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { getLessons } from "@/api/admin/lessons.api";

export default function AdminLessonsPage() {
  const { data: lessons = [], isLoading: isLessonsLoading } = useQuery({
    queryKey: lessonsQueryKey.all,
    queryFn: async () => {
      const result = await getLessons({});
      return result.data;
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Course Lessons
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage individual lessons within course modules
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Lesson
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {isLessonsLoading ? (
          <div>Loading...</div>
        ) : (
          lessons.map((lesson) => (
            <LessonCard key={`lesson-card-${lesson.id}`} lesson={lesson} />
          ))
        )}
      </div>
    </div>
  );
}
