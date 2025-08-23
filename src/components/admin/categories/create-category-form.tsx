"use client";

import { useActionState } from "react";
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
import {
  createCategoryAction,
  CreateCategoryFormState,
} from "@/actions/admin/create-category";

const initialState: CreateCategoryFormState = {
  errors: {},
  message: null,
  defaultValue: {
    title: "",
    slug: "",
    description: "",
  },
};

export function CreateCategoryForm() {
  const [state, formAction, isPending] = useActionState(
    createCategoryAction,
    initialState
  );

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create New Category</CardTitle>
        <CardDescription>
          Add a new course category to organize your courses.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form action={formAction} className="space-y-6" autoComplete="off">
          {state.message && (
            <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded-md">
              {state.message}
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Title
            </label>
            <Input
              id="title"
              name="title"
              type="text"
              placeholder="Enter category title"
              className="mt-2"
              defaultValue={state.defaultValue?.title}
              aria-describedby={state.errors?.title ? "title-error" : undefined}
              aria-invalid={state.errors?.title ? "true" : "false"}
            />
            {state.errors?.title && (
              <p id="title-error" className="text-sm text-red-500">
                {state.errors.title[0]}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="slug" className="text-sm font-medium">
              Slug
            </label>
            <Input
              id="slug"
              name="slug"
              type="text"
              placeholder="Enter category slug"
              className="mt-2"
              defaultValue={state.defaultValue?.slug}
              aria-describedby={state.errors?.slug ? "slug-error" : undefined}
              aria-invalid={state.errors?.slug ? "true" : "false"}
            />
            {state.errors?.slug && (
              <p id="slug-error" className="text-sm text-red-500">
                {state.errors.slug[0]}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <Textarea
              id="description"
              name="description"
              placeholder="Enter category description (max 1000 characters)"
              className="mt-2"
              rows={4}
              defaultValue={state.defaultValue?.description}
              aria-describedby={
                state.errors?.description ? "description-error" : undefined
              }
              aria-invalid={state.errors?.description ? "true" : "false"}
            />
            {state.errors?.description && (
              <p id="description-error" className="text-sm text-red-500">
                {state.errors.description[0]}
              </p>
            )}
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={isPending} className="flex-1">
              {isPending ? "Creating..." : "Create Category"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => window.history.back()}
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
