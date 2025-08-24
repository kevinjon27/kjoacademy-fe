"use client";

import { useReducer, useState } from "react";
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
import { createCourseCategory, updateCourseCategory } from "@/api/admin/course-category";
import { CourseCategory } from "@/types/course-category";

// Validation schema
const createCategorySchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(1000, "Description must be at most 1000 characters"),
});

// Form data type
type FormData = {
  title: string;
  slug: string;
  description: string;
};

// Form errors type
type FormErrors = {
  title?: string;
  slug?: string;
  description?: string;
};

// Form state type
type FormState = {
  data: FormData;
  errors: FormErrors;
  isSubmitting: boolean;
  submitError: string | null;
};

// Form props type
interface CategoryFormProps {
  isEdit?: boolean;
  categoryData?: CourseCategory;
}

// Form actions
type FormAction =
  | { type: "SET_FIELD"; field: keyof FormData; value: string }
  | { type: "SET_ERRORS"; errors: FormErrors }
  | { type: "SET_SUBMITTING"; isSubmitting: boolean }
  | { type: "SET_SUBMIT_ERROR"; error: string | null }
  | { type: "RESET" };

// Initial form state
const getInitialState = (categoryData?: CourseCategory): FormState => ({
  data: {
    title: categoryData?.title || "",
    slug: categoryData?.slug || "",
    description: categoryData?.description || "",
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
    createCategorySchema.shape[field].parse(value);
    return undefined;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return error.issues[0]?.message;
    }
    return undefined;
  }
}

export function CategoryForm({ isEdit = false, categoryData }: CategoryFormProps) {
  const [state, dispatch] = useReducer(formReducer, getInitialState(categoryData));
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
    const validationResult = createCategorySchema.safeParse(state.data);
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
      if (isEdit && categoryData) {
        await updateCourseCategory(categoryData.slug, state.data);
      } else {
        await createCourseCategory(state.data);
      }
      router.push("/admin/categories");
      return null;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || 
        (isEdit ? "Failed to update category" : "Failed to create category");
      dispatch({ type: "SET_SUBMIT_ERROR", error: errorMessage });
      return errorMessage;
    } finally {
      dispatch({ type: "SET_SUBMITTING", isSubmitting: false });
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
              placeholder="Enter category title"
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
              placeholder="Enter category slug"
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
              placeholder="Enter category description (max 1000 characters)"
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
        </Form>
      </CardContent>
    </Card>
  );
}
