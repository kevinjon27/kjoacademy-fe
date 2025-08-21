import { User, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function AdminHeader() {
  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between px-6 py-4">
        <Link href="/admin">
          <div className="w-[180px]">
            <Image
              src="/img/kjoacademy-logo.webp"
              alt="KJO Academy"
              width={967}
              height={166}
              priority
              decoding="async"
            />
          </div>
        </Link>
        {/* <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">KJO</span>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                KJO Academy
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Admin Dashboard
              </p>
            </div>
          </div>
        </div> */}

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <User className="h-4 w-4" />
            <span>Admin User</span>
          </div>
          <Button variant="outline" size="sm">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}
