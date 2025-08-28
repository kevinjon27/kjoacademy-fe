"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { lessonsQueryKey } from "@/lib/query-key/lessons";
import { getQueryClient } from "@/lib/get-query-client";
import { LessonCard } from "@/components/admin/lessons/lesson-card";
import { ImportantDialog } from "@/components/shared/important-dialog";
import { Button } from "@/components/ui/button";
import { getLessons, deleteLesson } from "@/api/admin/lessons.api";
import { CourseLesson } from "@/types/course";

export default function AdminLessonsPage() {
  const [dialogDelete, setDialogDelete] = useState<{
    open: boolean;
    lesson: CourseLesson | null;
  }>({
    open: false,
    lesson: null,
  });

  const {
    data: lessons = [],
    isLoading: isLessonsLoading,
    refetch: refetchModules,
  } = useQuery({
    queryKey: lessonsQueryKey.all,
    queryFn: async () => {
      const result = await getLessons({});
      return result.data;
    },
  });

  const { mutateAsync: deleteLessonMutation, isPending: isDeleting } =
    useMutation({
      mutationFn: async () => {
        const result = await deleteLesson(dialogDelete.lesson?.id ?? "");
        return result;
      },
      onSuccess: async () => {
        const queryClient = getQueryClient();
        await queryClient.invalidateQueries({
          queryKey: lessonsQueryKey.all,
        });
        refetchModules();
        toast.success("Lesson deleted successfully");
        setDialogDelete((prev) => ({ ...prev, open: false, course: null }));
      },
      onError: (error: any) => {
        const errorMessage =
          error.response?.data?.message || "Failed to delete lesson";
        toast.error(errorMessage);
      },
    });

  const onDeleteClick = (lesson: CourseLesson) => {
    setDialogDelete((prev) => ({ ...prev, open: true, lesson }));
  };

  const onDeleteCancel = () => {
    setDialogDelete((prev) => ({ ...prev, open: false, lesson: null }));
  };

  const onDeleteConfirm = () => deleteLessonMutation();

  return (
    <>
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
              <LessonCard
                key={`lesson-card-${lesson.id}`}
                lesson={lesson}
                onDeleteClick={onDeleteClick}
              />
            ))
          )}
        </div>
      </div>

      {/* Modal Delete Module */}
      <ImportantDialog
        open={dialogDelete.open}
        onCancel={onDeleteCancel}
        onConfirm={onDeleteConfirm}
        title="Delete Lesson"
        description="Are you sure you want to delete this lesson? This action cannot be undone."
        isLoading={isDeleting}
      />
    </>
  );
}
