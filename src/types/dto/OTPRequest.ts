export type RequestOTPRequest = {
  phone: string;
  purpose: string;
};

export type VerifyOTPRequest = {
  otp: string;
  phone: string;
  purpose: string;
}
