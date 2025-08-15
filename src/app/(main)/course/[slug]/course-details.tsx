"use client";

import Image from "next/image";
import Link from "next/link";
import { Play, Video, Image as ImageIcon, Headphones, Clock, Users } from "lucide-react";
import { Course, CourseModule, CourseLesson } from "@/types/course";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface CourseDetailsProps {
  course: Course;
  modules: CourseModule[];
  lectures: Record<number, CourseLesson[]>;
}

export function CourseDetails({ course, modules, lectures }: CourseDetailsProps) {
  const getMediaTypeIcon = (mediaType: string) => {
    switch (mediaType) {
      case "video":
        return <Video className="h-4 w-4" />;
      case "image":
        return <ImageIcon className="h-4 w-4" />;
      case "audio":
        return <Headphones className="h-4 w-4" />;
      default:
        return <Video className="h-4 w-4" />;
    }
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const getTotalDuration = (lectures: CourseLesson[]) => {
    return lectures.reduce((total, lesson) => total + lesson.duration_seconds, 0);
  };

  return (
    <div className="space-y-8">
      {/* Hero Section with Background Image */}
      <div className="relative min-h-[400px] rounded-lg overflow-hidden">
        <Image
          src={course.bg_img_url}
          alt={course.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        
        <div className="relative z-10 p-6 md:p-8 lg:p-12 flex flex-col lg:flex-row gap-8 items-start">
          {/* Left Side - Course Info */}
          <div className="flex-1 text-white space-y-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              {course.title}
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-2xl">
              Master the fundamentals of cryptocurrency trading with our comprehensive course designed for beginners and intermediate traders.
            </p>
            <div className="flex items-center gap-6 text-sm md:text-base">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span>{course.enrolled_count} members enrolled</span>
              </div>
            </div>
          </div>

          {/* Right Side - Course Card */}
          <div className="w-full lg:w-80">
            <Card className="backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl">Start Learning</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Modules</span>
                    <span className="font-medium">{modules.length}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Total Lessons</span>
                    <span className="font-medium">
                      {Object.values(lectures).reduce((total, moduleLessons) => total + moduleLessons.length, 0)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Duration</span>
                    <span className="font-medium">
                      {formatDuration(
                        Object.values(lectures).reduce((total, moduleLessons) => 
                          total + getTotalDuration(moduleLessons), 0
                        )
                      )}
                    </span>
                  </div>
                </div>
                
                <Link href={`/course/${course.slug}/learn`}>
                  <Button className="w-full" size="lg">
                    <Play className="h-4 w-4 mr-2" />
                    Start Course
                  </Button>
                </Link>
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
            Explore the comprehensive modules and lectures designed to take you from beginner to expert.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {modules.map((module) => {
            const moduleLessons = lectures[module.id] || [];
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
                        <span>{module.lectures_count} lectures</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{formatDuration(moduleDuration)}</span>
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
                          {getMediaTypeIcon(lesson.media_type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm truncate">
                            {lesson.title}
                          </h4>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{formatDuration(lesson.duration_seconds)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </div>
  );
}
