"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { Course } from "@/types/course";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface CourseCardProps {
  course: Course;
  onPlay?: (course: Course) => void;
  className?: string;
}

export function CourseCard({ course, onPlay, className }: CourseCardProps) {
  const handlePlayClick = () => {
    if (onPlay) {
      onPlay(course);
    }
  };

  return (
    <Card
      className={`group overflow-hidden transition-all duration-200 hover:shadow-md ${className}`}
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={course.thumbnail_url}
          alt={course.title}
          fill
          className="object-cover transition-transform duration-200 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      </div>

      {/* Play button overlay positioned between thumbnail and details */}
      <div className="relative">
        <div className="absolute -top-6 right-4 z-10 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
          <Button
            size="icon"
            onClick={handlePlayClick}
            aria-label={`Play ${course.title}`}
            className="h-12 w-12 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary-500 hover:scale-110 transition-all duration-200"
          >
            <Play className="h-5 w-5 ml-0.5" />
          </Button>
        </div>
      </div>

      <CardHeader className="pb-3">
        <h3 className="font-semibold text-lg leading-tight line-clamp-2">
          {course.title}
        </h3>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-center">
          <span className="text-sm text-muted-foreground">
            {course.enrollment_count}{" "}
            {course.enrollment_count === 1 ? "member" : "members"} enrolled
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
