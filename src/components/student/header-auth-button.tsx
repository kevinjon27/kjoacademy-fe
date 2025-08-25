"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LS_KEYS } from "@/config/storage";
import { Button } from "@/components/ui/button";

export type Props = {
  isAuthenticated: boolean;
  signOut: () => Promise<void>;
};

export default function HeaderAuthButton({ isAuthenticated, signOut }: Props) {
  const router = useRouter();
  const signOutFromApp = async () => {
    await signOut();
    localStorage.removeItem(LS_KEYS.userData);
    router.push("/");
  };

  if (isAuthenticated) {
    return (
      <>
        <Button
          variant="outline"
          className="hidden sm:inline-flex"
          onClick={signOutFromApp}
        >
          Logout
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="sm:hidden"
          onClick={signOutFromApp}
        >
          Logout
        </Button>
      </>
    );
  }
  return (
    <Link href="/login">
      <Button variant="outline" className="hidden sm:inline-flex">
        Login
      </Button>
      <Button variant="outline" size="sm" className="sm:hidden">
        Login
      </Button>
    </Link>
  );
}
