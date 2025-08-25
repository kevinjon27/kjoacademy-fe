import dynamic from "next/dynamic";
import { withStudentAreaProtection } from "@/guards/withAuthProtected.server";
import CourseLessonHeader from "@/components/student/course/course-lesson-header";
import CourseModulesContentSection from "@/components/student/course/course-modules-content-section";

const CoursePlaybackSection = dynamic(
  () => import("@/components/student/course/course-playback-section")
);
const CourseInfoSection = dynamic(
  () => import("@/components/student/course/course-info-section")
);

export type Props = {
  params: Promise<{
    slug: string;
    lessonId: string;
  }>;
};

export default async function LessonDetailPage({ params }: Props) {
  // Check authentication and role access - redirects admins to admin site
  await withStudentAreaProtection();
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
        <div className="hidden lg:block lg:w-[400px] lg:h-[calc(100vh-61px)] border-l border-primary-700">
          <CourseModulesContentSection />
        </div>
      </section>
    </>
  );
}
