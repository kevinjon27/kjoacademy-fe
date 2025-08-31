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

  return <CourseList slug={slug} />;
}
