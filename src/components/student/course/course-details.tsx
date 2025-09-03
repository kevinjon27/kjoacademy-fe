"use client";

import Link from "next/link";
import { Play, Video, Clock, Users, BookOpen } from "lucide-react";
import { humanizeDuration } from "@/lib/time";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useQuery, useMutation } from "@tanstack/react-query";
import { coursesQueryKey } from "@/lib/query-key/courses";
import { getCourseBySlug } from "@/api/student/courses.api";
import { enrollCourse } from "@/api/student/enrollments.api";
import { useEnrollmentStatus } from "@/guards/withEnrollmentProtection.client";
import {
  CourseDetails as CourseDetailsType,
  CourseDetailsModule,
  CourseDetailsLesson,
} from "@/types/course";
import { toast } from "sonner";

interface CourseDetailsProps {
  slug: string;
}

export function RenderModulesAndLessons({
  modules,
}: {
  modules: CourseDetailsModule[];
}) {
  const getTotalDuration = (lessons: CourseDetailsLesson[]): number => {
    return lessons.reduce(
      (total, lesson) => total + lesson.duration_seconds,
      0
    );
  };

  const getMediaTypeIcon = (mediaType: string) => {
    switch (mediaType) {
      case "video/mp4":
        return <Video className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };

  return (
    <Accordion type="single" collapsible className="space-y-4">
      {modules.map((module) => {
        const moduleLessons = module.lessons || [];
        const moduleDuration = getTotalDuration(moduleLessons);

        return (
          <AccordionItem
            key={module.id}
            value={`module-${module.id}`}
            className="border rounded-lg px-4"
          >
            <AccordionTrigger className="hover:no-underline py-6">
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8 text-left">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{module.title}</h3>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Video className="h-4 w-4" />
                    <span>{module.lessons_count} lectures</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{humanizeDuration(moduleDuration)}</span>
                  </div>
                </div>
              </div>
            </AccordionTrigger>

            <AccordionContent>
              <div className="space-y-3 pb-4">
                {moduleLessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary">
                      {getMediaTypeIcon(lesson.lesson_type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate">
                        {lesson.title}
                      </h4>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{humanizeDuration(lesson.duration_seconds)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}

export function CourseDetails({ slug }: CourseDetailsProps) {
  const isEnrolled = useEnrollmentStatus({ slug });

  const { data: course, isLoading: isCourseLoading } = useQuery({
    queryKey: coursesQueryKey.detail(slug),
    queryFn: async (): Promise<CourseDetailsType> => {
      const result = await getCourseBySlug(slug);
      return result.data;
    },
    retry: false,
  });

  const { mutateAsync: doEnrollCourse, isPending: isEnrolling } = useMutation({
    mutationFn: async (course_id: string) => {
      const result = await enrollCourse({ course_id });
      return result.data;
    },
    onSuccess: () => {
      toast.success("You have successfully enrolled in this course");
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "Failed to enroll in course";
      toast.error(errorMessage);
    },
  });

  if (!course || isCourseLoading) return <div>Course not found</div>;

  return (
    <div className="space-y-8">
      {/* Hero Section with Background Image */}
      <div className="relative min-h-[400px] rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 p-6 md:p-8 lg:p-12 flex flex-col lg:flex-row gap-8 items-start">
          {/* Left Side - Course Info */}
          <div className="flex-1 text-white space-y-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              {course.title}
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-2xl">
              {course.description}
            </p>
            <div className="flex items-center gap-6 text-sm md:text-base">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span>{course.enrollment_count} members enrolled</span>
              </div>
            </div>
          </div>

          {/* Right Side - Course Card */}
          <div className="w-full lg:w-80">
            <Card className="backdrop-blur-sm">
              {/* <CardHeader>
                <CardTitle className="text-xl">
                  {isEnrolled ? "Continue Learning" : "Start Learning"}
                </CardTitle>
              </CardHeader> */}
              <CardContent className="space-y-4 pt-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Modules</span>
                    <span className="font-medium">{course.modules_count}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Total Lessons</span>
                    <span className="font-medium">{course.lessons_count}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Duration</span>
                    <span className="font-medium">
                      {humanizeDuration(course.duration_seconds)}
                    </span>
                  </div>
                </div>

                <Button
                  className="w-full"
                  size="lg"
                  disabled={isEnrolling}
                  onClick={() => doEnrollCourse(course.id)}
                >
                  <Play className="h-4 w-4 mr-2" />
                  {isEnrolled ? "Continue Learning" : "Start Course"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Course Modules Section */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Course Content
          </h2>
          <p className="text-muted-foreground">
            Explore the comprehensive modules and lectures designed to take you
            from beginner to expert.
          </p>
        </div>

        <RenderModulesAndLessons modules={course.modules} />
      </div>
    </div>
  );
}
