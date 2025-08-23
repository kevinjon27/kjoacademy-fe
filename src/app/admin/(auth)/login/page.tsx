import { redirect } from "next/navigation";
import { auth, signIn } from "@/lib/auth";
import LoginForm from "@/components/admin/login/login-form";

async function LoginPage() {
  const session = await auth();
  if (session?.user) {
    return redirect("/admin");
  }

  async function signInWithOtp(phone: string, otp: string) {
    "use server";
    try {
      const result = await signIn("otp-login", {
        phone,
        otp,
        purpose: "admin-login",
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error("Sign in error:", error);
      throw error;
    }
  }

  return <LoginForm signInWithOtp={signInWithOtp} />;
}

export default LoginPage;
