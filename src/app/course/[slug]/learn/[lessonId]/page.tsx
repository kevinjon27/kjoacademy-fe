import dynamic from "next/dynamic";
import CourseModulesContentSection from "./course-modules-content-section";

const CoursePlaybackSection = dynamic(
  () => import("@/app/course/[slug]/learn/[lessonId]/course-playback-section")
);

export type Props = {
  params: Promise<{
    lessonId: string;
  }>;
};

export default async function LessonDetailPage({ params }: Props) {
  const { lessonId } = await params;
  return (
    <div className="flex flex-col lg:flex-row">
      <CoursePlaybackSection
        mediaType="video/mp4"
        mediaUrl="/temp/TANISHA - Satisfy (Official Lyric Video).mp4"
      />
      <CourseModulesContentSection />
    </div>
  );
}
