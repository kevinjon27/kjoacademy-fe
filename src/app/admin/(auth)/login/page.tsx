import LoginForm from "@/components/admin/login/login-form";
import { requestLoginOTP, signInWithOtp } from "./actions";

async function LoginPage() {
  return (
    <LoginForm
      requestLoginOTP={requestLoginOTP}
      signInWithOtp={signInWithOtp}
    />
  );
}

export default LoginPage;
