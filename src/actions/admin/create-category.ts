"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createCourseCategory } from "@/api/admin/course-category.server";
import { CreateCourseCategoryRequest } from "@/types/dto/course-category-request";

// Validation schema
const createCategorySchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(1000, "Description must be at most 1000 characters"),
});

// Form state type
export type CreateCategoryFormState = {
  errors?: {
    title?: string[];
    slug?: string[];
    description?: string[];
  };
  message?: string | null;
  defaultValue?: {
    title: string;
    slug: string;
    description: string;
  };
  axiosError?: {
    status: number;
    errors: Record<string, string[]>;
  };
};

// Server action
export async function createCategoryAction(
  prevState: CreateCategoryFormState,
  formData: FormData
): Promise<CreateCategoryFormState> {
  const validatedFields = createCategorySchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    description: formData.get("description"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Invalid fields. Failed to create category.",
      defaultValue: {
        title: (formData.get("title") as string) || "",
        slug: (formData.get("slug") as string) || "",
        description: (formData.get("description") as string) || "",
      },
    };
  }

  const { title, slug, description } = validatedFields.data;

  try {
    const data: CreateCourseCategoryRequest = {
      title,
      slug,
      description,
    };

    await createCourseCategory(data);
  } catch (error: any) {
    return {
      errors: {},
      message:
        error.response?.data?.message ||
        "Something went wrong. Failed to create category.",
      defaultValue: {
        title,
        slug,
        description,
      },
      axiosError: {
        status: error.response?.status || 500,
        errors: error.response?.data?.errors || {},
      },
    };
  }

  revalidatePath("/admin/categories");
  redirect("/admin/categories");
}
