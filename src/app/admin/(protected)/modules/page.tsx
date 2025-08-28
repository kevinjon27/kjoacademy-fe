"use client";

import { useQuery } from "@tanstack/react-query";
import { modulesQueryKey } from "@/lib/query-key/modules";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ModuleList } from "@/components/admin/modules/module-list";
import { getModules } from "@/api/admin/modules.api";

export default function AdminModulesPage() {
  const {
    data: modules = [],
    isLoading: isModulesLoading,
  } = useQuery({
    queryKey: modulesQueryKey.all,
    queryFn: async () => {
      const result = await getModules({});
      return result.data;
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Course Modules
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage course modules and their content
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Module
        </Button>
      </div>

      {isModulesLoading ? (
        <div>Loading...</div>
      ) : (
        <ModuleList modules={modules} />
      )}
    </div>
  );
}
