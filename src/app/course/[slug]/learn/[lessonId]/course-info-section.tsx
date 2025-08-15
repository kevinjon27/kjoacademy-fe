"use client";

import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export type Props = {
  className?: string;
}

export default function CourseInfoSection({ className }: Props) {
  return (
    <div className={cn("course-info-section", className)}>
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="course-content">Course Content</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <p>This is the overview of the course</p>
        </TabsContent>
        <TabsContent value="course-content">
          <p>This is the course content</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
