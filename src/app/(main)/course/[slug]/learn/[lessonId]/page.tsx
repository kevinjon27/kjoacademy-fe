import dynamic from "next/dynamic";
import CourseLessonHeader from "./course-lesson-header";
import CourseModulesContentSection from "./course-modules-content-section";

const CoursePlaybackSection = dynamic(
  () => import("./course-playback-section")
);
const CourseInfoSection = dynamic(() => import("./course-info-section"));

export type Props = {
  params: Promise<{
    slug: string;
    lessonId: string;
  }>;
};

export default async function LessonDetailPage({ params }: Props) {
  const { slug, lessonId } = await params;
  // TODO: get the course and lesson data from the backend

  return (
    <>
      <CourseLessonHeader
        course={{ title: "Docker and Kubernetes", slug: "docker-and-kube" }}
      />
      <section className="flex flex-col lg:flex-row">
        <div className="flex-1">
          <CoursePlaybackSection
            mediaType="video/mp4"
            mediaUrl="/temp/TANISHA - Satisfy (Official Lyric Video).mp4"
          />
          <CourseInfoSection className="p-8" />
        </div>
        <CourseModulesContentSection />
      </section>
    </>
  );
}
