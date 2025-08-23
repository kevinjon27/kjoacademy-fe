export type RequestOTPResponse = {
  message: string;
};

export type VerifyOTPResponse = {
  message: string;
  access_token: string;
};
