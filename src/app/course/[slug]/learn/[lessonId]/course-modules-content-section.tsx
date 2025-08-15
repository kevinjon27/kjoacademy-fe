"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function CourseModulesContentSection() {
  return (
    <div className="course-modules-content-section w-full lg:w-[480px]">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
