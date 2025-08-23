import { redirect } from "next/navigation";
import { getAuthData } from "@/lib/auth";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authData = await getAuthData();
  if (authData) {
    redirect("/");
  }

  return <div>{children}</div>;
}
