"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function CourseModulesContentSection() {
  return (
    <div className="course-modules-content-section w-full lg:w-[400px]">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="px-6">Is it accessible?</AccordionTrigger>
          <AccordionContent className="px-6">This is the content</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
