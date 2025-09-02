"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm, ControllerRenderProps } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQuery, useMutation } from "@tanstack/react-query";
import { categoriesQueryKey } from "@/lib/query-key/categories";
import { getQueryClient } from "@/lib/get-query-client";
import { coursesQueryKey } from "@/lib/query-key/courses";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import { FormSwitch } from "@/components/shared/form-switch";
import { MultiSelect, MultiSelectOption } from "@/components/shared/multi-select";
import { getCourseCategories } from "@/api/admin/categories.api";
import { createCourse, updateCourse } from "@/api/admin/courses.api";
import { CourseCategory, Course } from "@/types/course";
import {
  CreateCourseRequest,
  UpdateCourseRequest,
} from "@/types/dto/course-request";

// Validation schema
const courseFormSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(255, "Title must be at most 255 characters"),
  categories: z.array(z.string()).min(1, "Select at least one category"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .max(255, "Slug must be at most 255 characters")
    .regex(
      /^[a-z0-9-]+$/,
      "Slug must contain only lowercase letters, numbers, and hyphens"
    ),
  description: z
    .string()
    .min(1, "Description is required")
    .max(1000, "Description must be at most 1000 characters"),
  thumbnail_url: z.string().min(1, "Thumbnail URL is required"),
  is_published: z.boolean(),
});

type CourseFormData = z.infer<typeof courseFormSchema>;

// Form props type
interface CourseFormProps {
  isEdit?: boolean;
  courseData?: Course;
}

export function CourseForm({ isEdit = false, courseData }: CourseFormProps) {
  const router = useRouter();
  const params = useParams();
  const { slug: routeSlug = "" } = params;
  const [searchCategory, setSearchCategory] = useState("");
  const [categoryOptions, setCategoryOptions] = useState<MultiSelectOption[]>([]);

  // query to search categories
  const { data: categories } = useQuery({
    queryKey: categoriesQueryKey.list({
      q: searchCategory,
    }),
    queryFn: async (): Promise<CourseCategory[]> => {
      const response = await getCourseCategories({
        q: searchCategory,
      });
      return response.data;
    },
    staleTime: 5 * 1000, // 3 seconds
  });

  // mutation to create or update the course
  const { mutateAsync: createCourseMutation } = useMutation({
    mutationFn: async (data: CreateCourseRequest) => {
      return await createCourse(data as CreateCourseRequest);
    },
    onSuccess: () => {
      const queryClient = getQueryClient();
      queryClient.invalidateQueries({
        queryKey: coursesQueryKey.lists(),
      });
      router.push("/admin/courses");
    },
    onError: (error) => {
      const errorMessage =
        (error as any)?.response?.data?.message || "Failed to create course";
      // Set a general form error
      setError("root", {
        type: "manual",
        message: errorMessage,
      });
    },
  });

  const { mutateAsync: updateCourseMutation } = useMutation({
    mutationFn: async (data: UpdateCourseRequest) => {
      return await updateCourse(
        routeSlug as string,
        data as UpdateCourseRequest
      );
    },
    onSuccess: () => {
      const queryClient = getQueryClient();
      queryClient.invalidateQueries({
        queryKey: coursesQueryKey.detail(routeSlug as string),
      });
      queryClient.invalidateQueries({
        queryKey: coursesQueryKey.all,
      });
      router.push("/admin/courses");
    },
    onError: (error) => {
      const errorMessage =
        (error as any)?.response?.data?.message || "Failed to update course";
      // Set a general form error
      setError("root", {
        type: "manual",
        message: errorMessage,
      });
    },
  });

  /**
   * Happens only in edit mode
   * Populate the category combobox with the category of the course
   * Set the form values to the course data
   */
  // useEffect(() => {
  //   if (courseData) {
  //     setSelectedCategory({
  //       value: courseData.category.id,
  //       label: courseData.category.title,
  //     });
  //     form.reset(courseData);
  //     form.setValue("category_id", courseData.category.id);
  //   }
  // }, [courseData]);

  useEffect(() => {
    if (categories?.length) {
      setCategoryOptions(
        categories.map((category) => ({
          value: category.id,
          label: category.title,
        }))
      );
    } else {
      setCategoryOptions([]);
    }
  }, [categories]);

  const form = useForm<CourseFormData>({
    resolver: zodResolver(courseFormSchema),
    defaultValues: {
      title: courseData?.title || "",
      categories: courseData?.categories?.map((category) => category.id) || [],
      slug: courseData?.slug || "",
      description: courseData?.description || "",
      thumbnail_url: courseData?.thumbnail_url || "",
      is_published: courseData?.is_published || false,
    },
    mode: "onChange", // Enable real-time validation
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = form;

  // Form submission function
  const onSubmit = async (data: CourseFormData) => {
    if (isEdit && courseData) {
      await updateCourseMutation(data as UpdateCourseRequest);
    } else {
      await createCourseMutation(data as CreateCourseRequest);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{isEdit ? "Edit Course" : "Create New Course"}</CardTitle>
        <CardDescription>
          {isEdit ? "Update the course information." : "Add a new course."}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
            autoComplete="off"
          >
            {errors.root && (
              <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded-md">
                {errors.root.message}
              </div>
            )}

            <FormField
              control={form.control}
              name="categories"
              render={({
                field,
              }: {
                field: ControllerRenderProps<CourseFormData, "categories">;
              }) => (
                <FormItem>
                  <FormLabel>Categories</FormLabel>
                  <FormControl>
                    <MultiSelect
                      options={categoryOptions}
                      defaultValue={field.value}
                      onValueChange={(value) => {
                        field.onChange(value);
                      }}
                      onSearch={(query) => {
                        setSearchCategory(query);
                      }}
                      placeholder="Choose course categories"
                    />
                  </FormControl>
                  <FormMessage id="categories-error" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="title"
              render={({
                field,
              }: {
                field: ControllerRenderProps<CourseFormData, "title">;
              }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter course title"
                      {...field}
                      aria-describedby={
                        errors.title ? "title-error" : undefined
                      }
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
              render={({
                field,
              }: {
                field: ControllerRenderProps<CourseFormData, "slug">;
              }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter course slug"
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
              render={({
                field,
              }: {
                field: ControllerRenderProps<CourseFormData, "description">;
              }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter course description (max 1000 characters)"
                      rows={4}
                      {...field}
                      aria-describedby={
                        errors.description ? "description-error" : undefined
                      }
                      aria-invalid={errors.description ? "true" : "false"}
                    />
                  </FormControl>
                  <FormMessage id="description-error" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="thumbnail_url"
              render={({
                field,
              }: {
                field: ControllerRenderProps<CourseFormData, "thumbnail_url">;
              }) => (
                <FormItem>
                  <FormLabel>Thumbnail URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter thumbnail url"
                      {...field}
                      aria-describedby={
                        errors.thumbnail_url ? "thumbnail_url-error" : undefined
                      }
                      aria-invalid={errors.thumbnail_url ? "true" : "false"}
                    />
                  </FormControl>
                  <FormMessage id="thumbnail_url-error" />
                </FormItem>
              )}
            />

            <FormSwitch
              control={form.control}
              name="is_published"
              id="is_published"
              label="Published"
            />

            <div className="flex gap-4">
              <Button type="submit" disabled={isSubmitting} className="flex-1">
                {isSubmitting
                  ? isEdit
                    ? "Updating..."
                    : "Creating..."
                  : isEdit
                  ? "Update Course"
                  : "Create Course"}
              </Button>
              <Button
                type="button"
                variant="outline"
                disabled={isSubmitting}
                onClick={() => router.push("/admin/courses")}
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
