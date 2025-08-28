"use client";

import { ModuleCard } from "@/components/admin/modules/module-card";
import { CourseModule } from "@/types/course";

export type Props = {
  modules: CourseModule[];
};

export function ModuleList({ modules }: Props) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {modules.map((module) => (
        <ModuleCard key={`mod-card-${module.id}`} module={module} />
      ))}
    </div>
  );
}
