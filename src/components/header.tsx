'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">K</span>
              </div>
              <span className="text-xl font-bold text-foreground">KJO Academy</span>
            </Link>
          </div>

          {/* Right side - Login and Language */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative">
              <select
                className="appearance-none bg-transparent border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                defaultValue="id"
              >
                <option value="id">🇮🇩 ID</option>
                <option value="en">🇺🇸 EN</option>
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg
                  className="w-4 h-4 text-muted-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>

            {/* Login Button */}
            <Link href="/login">
              <Button variant="outline" className="hidden sm:inline-flex">
                Login
              </Button>
              <Button variant="outline" size="sm" className="sm:hidden">
                Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
