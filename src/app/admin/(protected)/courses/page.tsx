"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/get-query-client";
import { coursesQueryKey } from "@/lib/query-key/courses";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ImportantDialog } from "@/components/shared/important-dialog";
import { CourseCard } from "@/components/admin/courses/course-card";
import { getCourses, deleteCourse } from "@/api/admin/courses.api";
import { Course } from "@/types/course";

export default function AdminCoursesPage() {
  const [dialogDelete, setDialogDelete] = useState<{
    open: boolean;
    course: Course | null;
  }>({
    open: false,
    course: null,
  });

  const {
    data: courses = [],
    isLoading: isLoadingCourses,
    refetch: refetchCourses,
  } = useQuery({
    queryKey: coursesQueryKey.all,
    queryFn: async () => {
      const result = await getCourses({});
      return result.data;
    },
    staleTime: 5 * 1000, // 5 seconds
  });

  const { mutateAsync: deleteCourseMutation, isPending: isDeleting } =
    useMutation({
      mutationFn: async () => {
        const result = await deleteCourse(dialogDelete.course?.slug ?? "");
        return result;
      },
      onSuccess: async () => {
        const queryClient = getQueryClient();
        await queryClient.invalidateQueries({
          queryKey: coursesQueryKey.all,
        });
        refetchCourses();
        toast.success("Course deleted successfully");
        setDialogDelete((prev) => ({ ...prev, open: false, course: null }));
      },
      onError: (error: any) => {
        const errorMessage =
          error.response?.data?.message || "Failed to delete course";
        toast.error(errorMessage);
      },
    });

  const onDeleteClick = (course: Course) => {
    setDialogDelete((prev) => ({ ...prev, open: true, course }));
  };

  const onDeleteCancel = () => {
    setDialogDelete((prev) => ({ ...prev, open: false, course: null }));
  };

  const onDeleteConfirm = () => deleteCourseMutation();

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Courses
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Manage all courses in your LMS
            </p>
          </div>
          <Link href="/admin/courses/create">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Course
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {isLoadingCourses ? (
            <div>Loading...</div>
          ) : (
            courses.map((course) => (
              <CourseCard
                key={`course-card-${course.id}`}
                course={course}
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
        title="Delete Course"
        description="Are you sure you want to delete this course? This action cannot be undone."
        isLoading={isDeleting}
      />
    </>
  );
}
