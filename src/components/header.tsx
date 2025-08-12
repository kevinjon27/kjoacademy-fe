import Link from "next/link";
import { cookies } from 'next/headers'
import { Button } from "@/components/ui/button";
import { LanguageChanger } from "@/components/language-changer";

export async function Header() {
  const cookieStore = await cookies();
  const currentLocale = cookieStore.get("locale")?.value || "id";

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
              <span className="text-xl font-bold text-foreground">
                KJO Academy
              </span>
            </Link>
          </div>

          {/* Right side - Login and Language */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <LanguageChanger currentLocale={currentLocale} />

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
