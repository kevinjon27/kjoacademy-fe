import { CourseForm } from "@/components/admin/courses/course-form";

export default function CreateCoursePage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Create Course</h1>
        <p className="text-gray-600 mt-2">Add a new course.</p>
      </div>

      <CourseForm />
    </div>
  );
}
