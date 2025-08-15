"use client";

import { CourseCard } from "@/components/course-card";
import { Course } from "@/types/course";

interface CourseListProps {
  courses: Course[];
}

export function CourseList({ courses }: CourseListProps) {
  const handlePlayCourse = (course: Course) => {
    // TODO: Implement course play functionality
    console.log('Playing course:', course.title);
    // You can navigate to the course detail page or open a video player
    // window.location.href = `/courses/${course.slug}/learn`;
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
          onPlay={handlePlayCourse}
        />
      ))}
    </div>
  );
}
