"use client";

import * as React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface OtpDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  phoneNumber: string;
  onVerify: (otp: string) => Promise<void>;
  onResend: () => Promise<void>;
}

export function OtpDialog({
  open,
  onOpenChange,
  phoneNumber,
  onVerify,
  onResend,
}: OtpDialogProps) {
  const [otp, setOtp] = React.useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isResending, setIsResending] = React.useState(false);
  const [error, setError] = React.useState("");
  const [countdown, setCountdown] = React.useState(0);

  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

  // Countdown timer for resend
  React.useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // Auto-focus first input when dialog opens
  React.useEffect(() => {
    if (open && inputRefs.current[0]) {
      inputRefs.current[0]?.focus();
    }
  }, [open]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return; // Prevent multiple characters

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError(""); // Clear error when user types

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      // Move to previous input on backspace if current is empty
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      setError("Please enter the complete 6-digit OTP");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await onVerify(otpString);
    } catch (err) {
      setError("Invalid OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    setError("");

    try {
      await onResend();
      setCountdown(60); // Start 60-second countdown
    } catch (err) {
      setError("Failed to resend OTP. Please try again.");
    } finally {
      setIsResending(false);
    }
  };

  const canResend = countdown === 0 && !isResending;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="space-y-6">
        <AlertDialogHeader>
          <AlertDialogTitle>Enter OTP</AlertDialogTitle>
          <AlertDialogDescription>{`We've sent a 6-digit code to ${phoneNumber}`}</AlertDialogDescription>
        </AlertDialogHeader>
        {/* OTP Input */}
        <div className="space-y-4">
          <div className="flex justify-center space-x-2">
            {otp.map((digit, index) => (
              <Input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-lg font-semibold"
                disabled={isLoading}
                autoComplete="none"
              />
            ))}
          </div>

          {/* Error message */}
          {error && (
            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
              <p className="text-sm text-destructive text-center">{error}</p>
            </div>
          )}
        </div>

        {/* Verify Button */}
        <Button
          onClick={handleVerify}
          className="w-full h-11"
          disabled={isLoading || otp.join("").length !== 6}
        >
          {isLoading ? "Verifying..." : "Verify OTP"}
        </Button>

        {/* Resend Section */}
        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            {`Didn't receive the code?`}
          </p>
          {canResend ? (
            <button
              onClick={handleResend}
              disabled={isResending}
              className="text-sm text-primary hover:underline disabled:opacity-50"
            >
              {isResending ? "Sending..." : "Resend OTP"}
            </button>
          ) : (
            <p className="text-sm text-muted-foreground">
              Resend available in {countdown}s
            </p>
          )}
        </div>

        {/* Close Button */}
        <div className="text-center">
          <button
            onClick={() => onOpenChange(false)}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Use different phone number
          </button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
