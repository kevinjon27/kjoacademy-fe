export type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function CourseDetailPage({ params }: Props) {
  const { slug } = await params;

  if (!slug) {
    return <h1>No slug provided</h1>;
  }

  return <h1>You are currently choosing the {slug} course category</h1>;
}
