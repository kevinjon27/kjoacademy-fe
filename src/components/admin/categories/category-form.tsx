"use client";

import { useRouter } from "next/navigation";
import { useForm, ControllerRenderProps } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createCourseCategory, updateCourseCategory } from "@/api/admin/categories.api";
import { CourseCategory } from "@/types/course";
import { CreateCourseCategoryRequest, UpdateCourseCategoryRequest } from "@/types/dto/course-category-request";

// Validation schema
const categoryFormSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(255, "Title must be at most 255 characters"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .max(255, "Slug must be at most 255 characters")
    .regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(1000, "Description must be at most 1000 characters"),
});

type CategoryFormData = z.infer<typeof categoryFormSchema>;

// Form props type
interface CategoryFormProps {
  isEdit?: boolean;
  categoryData?: CourseCategory;
}

export function CategoryForm({ isEdit = false, categoryData }: CategoryFormProps) {
  const router = useRouter();

  const form = useForm<CategoryFormData>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      title: categoryData?.title || "",
      slug: categoryData?.slug || "",
      description: categoryData?.description || "",
    },
    mode: "onChange", // Enable real-time validation
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = form;

  // Form submission function
  const onSubmit = async (data: CategoryFormData) => {
    try {
      if (isEdit && categoryData) {
        await updateCourseCategory(categoryData.slug, data as UpdateCourseCategoryRequest);
      } else {
        await createCourseCategory(data as CreateCourseCategoryRequest);
      }
      router.push("/admin/categories");
    } catch (error: unknown) {
      const errorMessage =
        (error as any)?.response?.data?.message || 
        (isEdit ? "Failed to update category" : "Failed to create category");
      
      // Set a general form error
      setError("root", {
        type: "manual",
        message: errorMessage,
      });
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{isEdit ? "Edit Category" : "Create New Category"}</CardTitle>
        <CardDescription>
          {isEdit 
            ? "Update the course category information."
            : "Add a new course category to organize your courses."
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" autoComplete="off">
            {errors.root && (
              <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded-md">
                {errors.root.message}
              </div>
            )}

            <FormField
              control={form.control}
              name="title"
              render={({ field }: { field: ControllerRenderProps<CategoryFormData, "title"> }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter category title"
                      {...field}
                      aria-describedby={errors.title ? "title-error" : undefined}
                      aria-invalid={errors.title ? "true" : "false"}
                    />
                  </FormControl>
                  <FormMessage id="title-error" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="slug"
              render={({ field }: { field: ControllerRenderProps<CategoryFormData, "slug"> }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter category slug"
                      {...field}
                      aria-describedby={errors.slug ? "slug-error" : undefined}
                      aria-invalid={errors.slug ? "true" : "false"}
                    />
                  </FormControl>
                  <FormMessage id="slug-error" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }: { field: ControllerRenderProps<CategoryFormData, "description"> }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter category description (max 1000 characters)"
                      rows={4}
                      {...field}
                      aria-describedby={errors.description ? "description-error" : undefined}
                      aria-invalid={errors.description ? "true" : "false"}
                    />
                  </FormControl>
                  <FormMessage id="description-error" />
                </FormItem>
              )}
            />

            <div className="flex gap-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1"
              >
                {isSubmitting 
                  ? (isEdit ? "Updating..." : "Creating...") 
                  : (isEdit ? "Update Category" : "Create Category")
                }
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin/categories")}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
