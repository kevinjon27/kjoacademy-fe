import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { serverFetcher } from "@/lib/server-fetcher";
import { getQueryClient } from "@/lib/get-query-client";
import { coursesQueryKey } from "@/lib/query-key/courses";
import { Header } from "@/components/student/header";
import { Footer } from "@/components/student/footer";
import { CourseDetails } from "@/components/student/course/course-details";
import { withStudentAreaProtection } from "@/guards/withAuthProtected.server";
import { Course } from "@/types/course";

export type Props = {
  params: Promise<{
    slug: string;
  }>;
};

async function getCourseBySlug(slug: string): Promise<Course> {
  const result = await serverFetcher(
    `${process.env.NEXT_PUBLIC_API_URL}/v1/courses/${slug}`,
    {
      method: "GET",
    }
  );
  const json = await result.json();
  return json.data;
}

export default async function CourseDetailPage({ params }: Props) {
  // Check authentication and role access - redirects admins to admin site
  await withStudentAreaProtection();
  const { slug } = await params;

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: coursesQueryKey.detail(slug),
    queryFn: () => getCourseBySlug(slug),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Header />
      <section className="container mx-auto px-4 py-8">
        <CourseDetails slug={slug} />
      </section>
      <Footer />
    </HydrationBoundary>
  );
}
