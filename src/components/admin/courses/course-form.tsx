"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter, useParams } from "next/navigation";
import { useForm, ControllerRenderProps, useFieldArray } from "react-hook-form";
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
import { Switch } from "@/components/ui/switch";
import {
  MultiSelect,
  MultiSelectOption,
} from "@/components/shared/multi-select";
import { getCourseCategories } from "@/api/admin/categories.api";
import { createCourse, updateCourse } from "@/api/admin/courses.api";
import { CourseCategory } from "@/types/course";
import { CourseDetails } from "@/types/course";
import {
  CreateCourseRequest,
  UpdateCourseRequest,
} from "@/types/dto/course-request";
import { Plus, Trash2, X } from "lucide-react";

// Validation schema for lessons
const lessonSchema = z.object({
  title: z.string().min(1, "Lesson title is required"),
  lesson_type: z.string().min(1, "Lesson type is required"),
  lesson_content_url: z.string().min(1, "Lesson content URL is required"),
  duration_seconds: z.number().min(1, "Duration must be at least 1 second"),
});

// Validation schema for modules
const moduleSchema = z.object({
  title: z.string().min(1, "Module title is required"),
  duration_seconds: z.number().optional(),
  lessons: z.array(lessonSchema).min(1, "Module must have at least one lesson"),
});

// Validation schema for course form
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
  modules: z.array(moduleSchema).min(1, "Course must have at least one module"),
});

type CourseFormData = z.infer<typeof courseFormSchema>;

// Form props type
interface CourseFormProps {
  isEdit?: boolean;
  courseData?: CourseDetails;
}

export function CourseForm({ isEdit = false, courseData }: CourseFormProps) {
  const router = useRouter();
  const params = useParams();
  const { slug: routeSlug = "" } = params;
  const [searchCategory, setSearchCategory] = useState("");
  const [categoryOptions, setCategoryOptions] = useState<MultiSelectOption[]>(
    []
  );

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
      const result = await createCourse(data as CreateCourseRequest);
      return result.data;
    },
    onSuccess: (data) => {
      const queryClient = getQueryClient();
      queryClient.invalidateQueries({
        queryKey: coursesQueryKey.lists(),
      });
      toast.success(`Course "${data.title}" updated successfully`);
      router.push("/admin/courses");
    },
    onError: (error) => {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "Failed to create course";
      // Set a general form error
      setError("root", {
        type: "manual",
        message: errorMessage,
      });
    },
  });

  const { mutateAsync: updateCourseMutation } = useMutation({
    mutationFn: async (data: UpdateCourseRequest) => {
      const result = await updateCourse(
        routeSlug as string,
        data as UpdateCourseRequest
      );
      return result.data;
    },
    onSuccess: (data) => {
      console.log("onSuccess update", data);
      const queryClient = getQueryClient();
      queryClient.invalidateQueries({
        queryKey: coursesQueryKey.detail(routeSlug as string),
      });
      queryClient.invalidateQueries({
        queryKey: coursesQueryKey.all,
      });
      toast.success(`Course "${data.title}" updated successfully`);
      router.push("/admin/courses");
    },
    onError: (error) => {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "Failed to update course";
      // Set a general form error
      setError("root", {
        type: "manual",
        message: errorMessage,
      });
    },
  });

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
      modules: courseData?.modules || [
        {
          title: "",
          duration_seconds: undefined,
          lessons: [
            {
              title: "",
              lesson_type: "",
              lesson_content_url: "",
              duration_seconds: 0,
            },
          ],
        },
      ],
    },
    mode: "onChange", // Enable real-time validation
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    control,
  } = form;

  // Field arrays for modules and lessons
  const {
    fields: moduleFields,
    append: appendModule,
    remove: removeModule,
  } = useFieldArray({
    control,
    name: "modules",
  });

  // Form submission function
  const onSubmit = async (data: CourseFormData) => {
    if (isEdit && courseData) {
      await updateCourseMutation(data as UpdateCourseRequest);
    } else {
      await createCourseMutation(data as CreateCourseRequest);
    }
  };

  const addModule = () => {
    appendModule({
      title: "",
      duration_seconds: undefined,
      lessons: [
        {
          title: "",
          lesson_type: "",
          lesson_content_url: "",
          duration_seconds: 0,
        },
      ],
    });
  };

  const addLesson = (moduleIndex: number) => {
    const currentModules = form.getValues("modules");
    const updatedModules = [...currentModules];
    updatedModules[moduleIndex].lessons.push({
      title: "",
      lesson_type: "",
      lesson_content_url: "",
      duration_seconds: 0,
    });
    form.setValue("modules", updatedModules);
  };

  const removeLesson = (moduleIndex: number, lessonIndex: number) => {
    const currentModules = form.getValues("modules");
    const updatedModules = [...currentModules];
    updatedModules[moduleIndex].lessons.splice(lessonIndex, 1);

    // Ensure module has at least one lesson
    if (updatedModules[moduleIndex].lessons.length === 0) {
      updatedModules[moduleIndex].lessons.push({
        title: "",
        lesson_type: "",
        lesson_content_url: "",
        duration_seconds: 0,
      });
    }

    form.setValue("modules", updatedModules);
  };

  return (
    <Card className="w-full max-w-6xl mx-auto">
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

            {/* Basic Course Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        aria-describedby={
                          errors.slug ? "slug-error" : undefined
                        }
                        aria-invalid={errors.slug ? "true" : "false"}
                      />
                    </FormControl>
                    <FormMessage id="slug-error" />
                  </FormItem>
                )}
              />
            </div>

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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                          errors.thumbnail_url
                            ? "thumbnail_url-error"
                            : undefined
                        }
                        aria-invalid={errors.thumbnail_url ? "true" : "false"}
                      />
                    </FormControl>
                    <FormMessage id="thumbnail_url-error" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="is_published"
                render={({
                  field,
                }: {
                  field: ControllerRenderProps<CourseFormData, "is_published">;
                }) => (
                  <FormItem>
                    <FormLabel>Published</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage id="is_published-error" />
                  </FormItem>
                )}
              />
            </div>

            {/* Modules Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Course Modules</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addModule}
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Module
                </Button>
              </div>

              {errors.modules && (
                <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded-md">
                  {errors.modules.message}
                </div>
              )}

              {moduleFields.map((module, moduleIndex) => (
                <Card key={module.id} className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Module {moduleIndex + 1}</h4>
                      {moduleFields.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeModule(moduleIndex)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={control}
                        name={`modules.${moduleIndex}.title`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Module Title</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter module title"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={control}
                        name={`modules.${moduleIndex}.duration_seconds`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Duration (seconds)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Optional"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(
                                    e.target.value
                                      ? Number(e.target.value)
                                      : undefined
                                  )
                                }
                                value={field.value || ""}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Lessons Section */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h5 className="font-medium">Lessons</h5>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => addLesson(moduleIndex)}
                          className="flex items-center gap-2"
                        >
                          <Plus className="h-3 w-3" />
                          Add Lesson
                        </Button>
                      </div>

                      {form
                        .watch(`modules.${moduleIndex}.lessons`)
                        .map((lesson, lessonIndex) => (
                          <Card key={lessonIndex} className="p-3 bg-gray-50">
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">
                                  Lesson {lessonIndex + 1}
                                </span>
                                {form.watch(`modules.${moduleIndex}.lessons`)
                                  .length > 1 && (
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                      removeLesson(moduleIndex, lessonIndex)
                                    }
                                    className="text-red-600 hover:text-red-700 hover:bg-red-50 h-6 w-6 p-0"
                                  >
                                    <X className="h-3 w-3" />
                                  </Button>
                                )}
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <FormField
                                  control={control}
                                  name={`modules.${moduleIndex}.lessons.${lessonIndex}.title`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Lesson Title</FormLabel>
                                      <FormControl>
                                        <Input
                                          placeholder="Enter lesson title"
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <FormField
                                  control={control}
                                  name={`modules.${moduleIndex}.lessons.${lessonIndex}.lesson_type`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Lesson Type</FormLabel>
                                      <FormControl>
                                        <Input
                                          placeholder="e.g., video/mp4, audio/mp3"
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <FormField
                                  control={control}
                                  name={`modules.${moduleIndex}.lessons.${lessonIndex}.lesson_content_url`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Content URL</FormLabel>
                                      <FormControl>
                                        <Input
                                          placeholder="Enter content URL"
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <FormField
                                  control={control}
                                  name={`modules.${moduleIndex}.lessons.${lessonIndex}.duration_seconds`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Duration (seconds)</FormLabel>
                                      <FormControl>
                                        <Input
                                          type="number"
                                          placeholder="Enter duration"
                                          {...field}
                                          onChange={(e) =>
                                            field.onChange(
                                              Number(e.target.value)
                                            )
                                          }
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                            </div>
                          </Card>
                        ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>

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
