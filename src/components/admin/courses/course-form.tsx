"use client";

import { useReducer } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { Form } from "@/components/ui/form";
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
import { getCourseCategories } from "@/api/admin/categories.api";
import { createCourse, updateCourse } from "@/api/admin/courses.api";
import { CourseCategory, Course } from "@/types/course";

// Validation schema
const courseSchema = z.object({
  title: z.string().min(1, "Title is required"),
  category_id: z.string().min(1, "Category slug is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(1000, "Description must be at most 1000 characters"),
  thumbnail_url: z.string().min(1, "Thumbnail URL is required"),
  is_published: z.boolean().default(false),
});

// Form data type
type FormData = {
  title: string;
  category_id: string;
  slug: string;
  description: string;
  thumbnail_url: string;
  is_published: boolean;
};

// Form errors type
type FormErrors = {
  title?: string;
  category_id?: string;
  slug?: string;
  description?: string;
  thumbnail_url?: string;
  is_published?: boolean;
};

// Form state type
type FormState = {
  data: FormData;
  errors: FormErrors;
  isSubmitting: boolean;
  submitError: string | null;
};

// Form props type
interface CourseFormProps {
  isEdit?: boolean;
  courseData?: Course;
}

// Form actions
type FormAction =
  | { type: "SET_FIELD"; field: keyof FormData; value: string }
  | { type: "SET_ERRORS"; errors: FormErrors }
  | { type: "SET_SUBMITTING"; isSubmitting: boolean }
  | { type: "SET_SUBMIT_ERROR"; error: string | null }
  | { type: "RESET" };

// Initial form state
const getInitialState = (courseData?: Course): FormState => ({
  data: {
    title: courseData?.title || "",
    category_id: courseData?.category.id || "",
    slug: courseData?.slug || "",
    description: courseData?.description || "",
    thumbnail_url: courseData?.thumbnail_url || "",
    is_published: courseData?.is_published || false,
  },
  errors: {},
  isSubmitting: false,
  submitError: null,
});

// Form reducer
function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        data: {
          ...state.data,
          [action.field]: action.value,
        },
        errors: {
          ...state.errors,
          [action.field]: undefined, // Clear error when field is updated
        },
      };
    case "SET_ERRORS":
      return {
        ...state,
        errors: action.errors,
      };
    case "SET_SUBMITTING":
      return {
        ...state,
        isSubmitting: action.isSubmitting,
      };
    case "SET_SUBMIT_ERROR":
      return {
        ...state,
        submitError: action.error,
      };
    case "RESET":
      return getInitialState();
    default:
      return state;
  }
}

// Real-time validation function
function validateField(
  field: keyof FormData,
  value: string
): string | undefined {
  try {
    courseSchema.shape[field].parse(value);
    return undefined;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return error.issues[0]?.message;
    }
    return undefined;
  }
}

export function CourdseForm({ isEdit = false, courseData }: CourseFormProps) {
  const [state, dispatch] = useReducer(
    formReducer,
    getInitialState(courseData)
  );
  const router = useRouter();

  // Handle field changes with real-time validation
  const handleFieldChange = (field: keyof FormData, value: string) => {
    dispatch({ type: "SET_FIELD", field, value });

    // Real-time validation
    const error = validateField(field, value);
    if (error) {
      dispatch({
        type: "SET_ERRORS",
        errors: { ...state.errors, [field]: error },
      });
    }
  };

  // Form submission function
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous errors
    dispatch({ type: "SET_SUBMIT_ERROR", error: null });

    // Validate all fields
    const validationResult = courseSchema.safeParse(state.data);
    if (!validationResult.success) {
      const errors: FormErrors = {};
      validationResult.error.issues.forEach((error: z.ZodIssue) => {
        const field = error.path[0] as keyof FormData;
        errors[field] = error.message;
      });
      dispatch({ type: "SET_ERRORS", errors });
      return "Validation failed. Please check the form fields.";
    }

    dispatch({ type: "SET_SUBMITTING", isSubmitting: true });

    try {
      if (isEdit && courseData) {
        await updateCourse(courseSchema.slug, state.data);
      } else {
        await createCourse(state.data);
      }
      router.push("/admin/course");
      return null;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        (isEdit ? "Failed to update course" : "Failed to create course");
      dispatch({ type: "SET_SUBMIT_ERROR", error: errorMessage });
      return errorMessage;
    } finally {
      dispatch({ type: "SET_SUBMITTING", isSubmitting: false });
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{isEdit ? "Edit Course" : "Create New Course"}</CardTitle>
        <CardDescription>
          {isEdit
            ? "Update the course information."
            : "Add a new course to organize your courses."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
          {state.submitError && (
            <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded-md">
              {state.submitError}
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Title
            </label>
            <Input
              id="title"
              type="text"
              placeholder="Enter course title"
              className="mt-2"
              value={state.data.title}
              onChange={(e) => handleFieldChange("title", e.target.value)}
              aria-describedby={state.errors.title ? "title-error" : undefined}
              aria-invalid={state.errors.title ? "true" : "false"}
            />
            {state.errors.title && (
              <p id="title-error" className="text-sm text-red-500">
                {state.errors.title}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="slug" className="text-sm font-medium">
              Slug
            </label>
            <Input
              id="slug"
              type="text"
              placeholder="Enter course slug"
              className="mt-2"
              value={state.data.slug}
              onChange={(e) => handleFieldChange("slug", e.target.value)}
              aria-describedby={state.errors.slug ? "slug-error" : undefined}
              aria-invalid={state.errors.slug ? "true" : "false"}
            />
            {state.errors.slug && (
              <p id="slug-error" className="text-sm text-red-500">
                {state.errors.slug}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <Textarea
              id="description"
              placeholder="Enter course description (max 1000 characters)"
              className="mt-2"
              rows={4}
              value={state.data.description}
              onChange={(e) => handleFieldChange("description", e.target.value)}
              aria-describedby={
                state.errors.description ? "description-error" : undefined
              }
              aria-invalid={state.errors.description ? "true" : "false"}
            />
            {state.errors.description && (
              <p id="description-error" className="text-sm text-red-500">
                {state.errors.description}
              </p>
            )}
          </div>

          <div className="flex gap-4">
            <Button
              type="submit"
              disabled={state.isSubmitting}
              className="flex-1"
            >
              {state.isSubmitting
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
        </Form>
      </CardContent>
    </Card>
  );
}
