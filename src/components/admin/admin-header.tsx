"use client";

import { User, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { LS_KEYS } from "@/config/storage";
import { Button } from "@/components/ui/button";

export type Props = {
  signOut: () => Promise<void>;
};

export function AdminHeader({ signOut }: Props) {
  const signOutFromApp = async () => {
    await signOut();
    localStorage.removeItem(LS_KEYS.userData);
  };

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

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <User className="h-4 w-4" />
            <span>Admin User</span>
          </div>
          <Button variant="outline" size="sm" onClick={signOutFromApp}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}
