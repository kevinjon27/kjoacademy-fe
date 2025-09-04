import { cn } from "@/lib/utils";
import { Loader as LoaderIcon } from "lucide-react";

export const Loader = ({ className }: { className?: string }) => {
  return (
    <LoaderIcon
      className={cn(
        "my-28 h-16 w-16 text-primary-foreground animate-spin",
        className
      )}
    />
  );
};
