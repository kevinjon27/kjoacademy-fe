"use client";

import { useState, useMemo, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { debounce } from "es-toolkit";
import { useForm, ControllerRenderProps } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Check, ChevronsUpDown, SearchIcon } from "lucide-react";
import { cn } from "@/lib/utils";
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
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FormSwitch } from "@/components/shared/form-switch";

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
  category_id: z.string().min(1, "Course category is required"),
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

  const [categoryOptions, setCategoryOptions] = useState<
    { value: string; label: string }[]
  >([]);

  async function onSearchCategory(
    evt: ChangeEvent<HTMLInputElement>
  ): Promise<void> {
    const target = evt.target as HTMLInputElement;
    const q = target.value;

    const response = await getCourseCategories({
      q: q || "",
      perPage: 10,
    });
    const options = response.data.map((category: CourseCategory) => ({
      value: category.id,
      label: category.title,
    }));

    setCategoryOptions(options);
  }
  const debouncedOnSearch = useMemo(() => debounce(onSearchCategory, 800), []);

  const form = useForm<CourseFormData>({
    resolver: zodResolver(courseFormSchema),
    defaultValues: {
      title: courseData?.title || "",
      category_id: courseData?.category.id || "",
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
    try {
      if (isEdit && courseData) {
        await updateCourse(courseData.slug, data as UpdateCourseRequest);
      } else {
        await createCourse(data as CreateCourseRequest);
      }
      router.push("/admin/courses");
    } catch (error: unknown) {
      const errorMessage =
        (error as any)?.response?.data?.message ||
        (isEdit ? "Failed to update course" : "Failed to create course");

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
              name="category_id"
              render={({
                field,
              }: {
                field: ControllerRenderProps<CourseFormData, "category_id">;
              }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Course Category</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? categoryOptions.find(
                                (category) => category.value === field.value
                              )?.label
                            : "Select Category"}
                          <ChevronsUpDown className="opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[480px]">
                      <Command>
                        <Input
                          type="text"
                          placeholder="Search Category"
                          className="h-9 focus:outline-none flex-1 mb-2"
                          onChange={debouncedOnSearch}
                        />
                        <CommandList>
                          <CommandEmpty>No category found.</CommandEmpty>
                          <CommandGroup>
                            {categoryOptions.map((category) => (
                              <CommandItem
                                value={category.label}
                                key={`ci-cat-${category.value}`}
                                onSelect={() => {
                                  form.setValue("category_id", category.value);
                                }}
                              >
                                {category.label}
                                <Check
                                  className={cn(
                                    "ml-auto",
                                    category.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage id="title-error" />
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
