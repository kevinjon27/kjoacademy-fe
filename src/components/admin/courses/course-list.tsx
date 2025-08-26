"use client";
import { useState } from "react";
import { toast } from "sonner";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/get-query-client";
import { coursesQueryKey } from "@/lib/query-key/courses";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { CourseCard } from "@/components/admin/courses/course-card";
import { getCourses, deleteCourse } from "@/api/admin/courses.api";
import { Course } from "@/types/course";

export function CourseList() {
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

  if (isLoadingCourses) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {courses.map((course) => (
          <CourseCard
            key={`course-card-${course.id}`}
            course={course}
            onDeleteClick={onDeleteClick}
          />
        ))}
      </div>

      {/* Dialog Delete Course */}
      <AlertDialog open={dialogDelete.open}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will delete the course and all
              of its modules and lessons.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={onDeleteCancel} disabled={isDeleting}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={onDeleteConfirm} disabled={isDeleting}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
