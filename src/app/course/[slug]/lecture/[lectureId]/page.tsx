export type Props = {
  params: Promise<{
    lectureId: string;
  }>;
};

export default async function LectureDetailPage({ params }: Props) {
  const { lectureId } = await params;
  return (
    <h1>
      This is the lecture detail page where the user can watch the lecture{" "}
      {lectureId}
    </h1>
  );
}
