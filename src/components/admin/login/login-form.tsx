"use client";

import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { LS_KEYS } from "@/config/storage";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { OtpDialog } from "@/components/shared/otp-dialog";

export type OtpRequestData = {
  phone: string;
  purpose: "student-login" | "admin-login";
  requestedAt: string;
  expiresAt: string;
};

export type Props = {
  requestLoginOTP: (
    phone: string,
    purpose: "admin-login" | "student-login"
  ) => Promise<void>;
  signInWithOtp: (
    phone: string,
    otp: string,
    purpose: "admin-login" | "student-login"
  ) => Promise<{ access_token: string; user: any } | null>;
};

export default function LoginForm({ requestLoginOTP, signInWithOtp }: Props) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    phone: "",
    errorMsg: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showOtpDialog, setShowOtpDialog] = useState(false);

  // Try to automatically show the OTP dialog if there is a pending OTP request
  useEffect(() => {
    const otpRequestData: string | null = localStorage.getItem(
      LS_KEYS.otpRequestData
    );

    if (otpRequestData) {
      const parsedOtpRequestData = JSON.parse(otpRequestData) as OtpRequestData;
      const isRequestNotExpired = dayjs(parsedOtpRequestData.expiresAt).isAfter(
        dayjs()
      );
      if (isRequestNotExpired) {
        setFormData((prev) => ({ ...prev, phone: parsedOtpRequestData.phone }));
        setShowOtpDialog(true);
      } else {
        localStorage.removeItem(LS_KEYS.otpRequestData);
      }
    } else {
      localStorage.removeItem(LS_KEYS.otpRequestData);
    }
  }, []);

  const onPhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormData((prev) => ({ ...prev, errorMsg: "" }));
    setIsLoading(true);

    try {
      // show error if phone number is empty
      if (!formData.phone.trim()) {
        setFormData((prev) => ({
          ...prev,
          errorMsg: "Please enter a valid phone number",
        }));
        return;
      }

      // Execute OTP Request here
      await requestLoginOTP(formData.phone, "admin-login");
      // if success, set the otp request data in local storage
      const currentTime = dayjs().toISOString();
      const otpRequestData: OtpRequestData = {
        phone: formData.phone,
        purpose: "admin-login",
        requestedAt: currentTime,
        expiresAt: dayjs(currentTime).add(3, "minutes").toISOString(),
      };
      localStorage.setItem(
        LS_KEYS.otpRequestData,
        JSON.stringify(otpRequestData)
      );
      // Show OTP dialog on successful submission
      setShowOtpDialog(true);
    } catch (err) {
      setFormData((prev) => ({
        ...prev,
        errorMsg: "An error occurred. Please try again.",
      }));
    } finally {
      setIsLoading(false);
    }
  };

  // verify and sign in with OTP
  const verifyLoginOTP = async (otp: string) => {
    try {
      const result = await signInWithOtp(formData.phone, otp, "admin-login");
      if (result) {
        setShowOtpDialog(false);
        localStorage.removeItem(LS_KEYS.otpRequestData);
        router.push("/admin");
      }
    } catch (error) {
      console.error("Error signing in with OTP", error);
      // You might want to show an error message to the user here
    }
  };

  const resendLoginOTP = async () => {
    console.log("TODO: Resend OTP");
  };

  return (
    <div className="min-h-[calc(100vh-3rem)] flex items-center justify-center">
      <Card className="w-full max-w-sm sm:max-w-md">
        <CardHeader className="pb-6">
          <CardTitle className="text-center text-xl sm:text-2xl">
            Login
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <form
            onSubmit={onPhoneSubmit}
            autoComplete="off"
            className="space-y-6"
          >
            <div className="space-y-4">
              <label
                htmlFor="phone"
                className="text-sm font-medium text-foreground block mb-2"
              >
                Phone Number
              </label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    phone: e.target.value,
                    errorMsg: prev.errorMsg ? "" : prev.errorMsg, // Clear error when user types
                  }));
                }}
                className="text-base"
                disabled={isLoading}
              />
            </div>

            {/* Error message area */}
            {formData.errorMsg && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                <p className="text-sm text-destructive">{formData.errorMsg}</p>
              </div>
            )}

            <Button
              type="submit"
              className="w-full h-11 sm:h-12 text-base font-medium"
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* OTP Dialog */}
      <OtpDialog
        open={showOtpDialog}
        onOpenChange={setShowOtpDialog}
        phoneNumber={formData.phone}
        onVerify={verifyLoginOTP}
        onResend={resendLoginOTP}
      />
    </div>
  );
}
