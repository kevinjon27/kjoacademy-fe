"use client";

import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CourseModulesContentSection = dynamic(
  () => import("@/components/course/course-modules-content-section")
);

export type Props = {
  className?: string;
};

export default function CourseInfoSection({ className }: Props) {
  return (
    <div className={cn("course-info-section", className)}>
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="course-content" className="block lg:hidden">
            Course Content
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <p>This is the overview of the course</p>
        </TabsContent>
        <TabsContent value="course-content" className="block lg:hidden">
          <CourseModulesContentSection />
        </TabsContent>
      </Tabs>
    </div>
  );
}
