import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Category Not Found</h1>
        <p className="text-gray-600 mb-8">
          The category you're looking for doesn't exist or has been removed.
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild>
            <Link href="/admin/categories">
              Back to Categories
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/admin/categories/create">
              Create New Category
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
