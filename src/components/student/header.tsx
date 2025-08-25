import Link from "next/link";
import { cookies } from "next/headers";
import Image from "next/image";
import { getAuthData } from "@/lib/auth";
import { LanguageChanger } from "@/components/shared/language-changer";
import HeaderAuthButton from "@/components/student/header-auth-button";
import { signOut } from "@/actions/auth";

export async function Header() {
  const cookieStore = await cookies();
  const currentLocale = cookieStore.get("locale")?.value || "id";

  const authData = await getAuthData();
  const isAuthenticated = !!authData?.accessToken;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary-700 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
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
          </div>

          {/* Right side - Login and Language */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <LanguageChanger currentLocale={currentLocale} />

            {/* Login Button */}
            <HeaderAuthButton
              isAuthenticated={isAuthenticated}
              signOut={signOut}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
