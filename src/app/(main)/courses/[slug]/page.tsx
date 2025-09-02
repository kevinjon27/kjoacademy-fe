import { CourseList } from "@/components/student/courses/course-list";

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!slug) {
    return <h1>No slug provided</h1>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <CourseList slug={slug} />
    </div>
  );
}
