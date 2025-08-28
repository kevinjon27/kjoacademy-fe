"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { modulesQueryKey } from "@/lib/query-key/modules";
import { getQueryClient } from "@/lib/get-query-client";
import { Button } from "@/components/ui/button";
import { ImportantDialog } from "@/components/shared/important-dialog";
import { ModuleCard } from "@/components/admin/modules/module-card";
import { getModules, deleteModule } from "@/api/admin/modules.api";
import { CourseModule } from "@/types/course";

export default function AdminModulesPage() {
  const [dialogDelete, setDialogDelete] = useState<{
    open: boolean;
    module: CourseModule | null;
  }>({
    open: false,
    module: null,
  });

  const {
    data: modules = [],
    isLoading: isModulesLoading,
    refetch: refetchModules,
  } = useQuery({
    queryKey: modulesQueryKey.all,
    queryFn: async () => {
      const result = await getModules({});
      return result.data;
    },
  });

  const { mutateAsync: deleteModuleMutation, isPending: isDeleting } =
    useMutation({
      mutationFn: async () => {
        const result = await deleteModule(dialogDelete.module?.id ?? "");
        return result;
      },
      onSuccess: async () => {
        const queryClient = getQueryClient();
        await queryClient.invalidateQueries({
          queryKey: modulesQueryKey.all,
        });
        refetchModules();
        toast.success("Module deleted successfully");
        setDialogDelete((prev) => ({ ...prev, open: false, course: null }));
      },
      onError: (error: any) => {
        const errorMessage =
          error.response?.data?.message || "Failed to delete module";
        toast.error(errorMessage);
      },
    });

  const onDeleteClick = (module: CourseModule) => {
    setDialogDelete((prev) => ({ ...prev, open: true, module }));
  };

  const onDeleteCancel = () => {
    setDialogDelete((prev) => ({ ...prev, open: false, module: null }));
  };

  const onDeleteConfirm = () => deleteModuleMutation();

  return (
    <>
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {isModulesLoading ? (
            <div>Loading...</div>
          ) : (
            modules.map((module) => (
              <ModuleCard
                key={`mod-card-${module.id}`}
                module={module}
                onDeleteClick={onDeleteClick}
              />
            ))
          )}
        </div>
      </div>

      {/* Modal Delete Module */}
      <ImportantDialog
        open={dialogDelete.open}
        onCancel={onDeleteCancel}
        onConfirm={onDeleteConfirm}
        title="Delete Module"
        description="Are you sure you want to delete this module? This action cannot be undone."
        isLoading={isDeleting}
      />
    </>
  );
}
