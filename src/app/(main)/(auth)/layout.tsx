import { withStudentAuthProtection } from "@/guards/withAuthProtected.server";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Redirect authenticated users to their appropriate areas
  await withStudentAuthProtection();

  return children;
}
