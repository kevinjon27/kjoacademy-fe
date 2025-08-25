import LoginForm from "@/components/student/login/login-form";
import { requestLoginOTP, signInWithOtp } from "@/actions/auth";

function LoginPage() {
  return (
    <LoginForm
      requestLoginOTP={requestLoginOTP}
      signInWithOtp={signInWithOtp}
    />
  );
}

export default LoginPage;
