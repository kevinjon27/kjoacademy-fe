import LoginForm from "@/components/login/login-form";
import { requestLoginOTP, signInWithOtp } from "./actions";

function LoginPage() {
  return (
    <LoginForm
      requestLoginOTP={requestLoginOTP}
      signInWithOtp={signInWithOtp}
    />
  );
}

export default LoginPage;
