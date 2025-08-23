import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { Provider } from "next-auth/providers";
import { axiosServer } from "@/lib/axios.server";
import { API_BASE_URL } from "@/config/api";

const providers: Provider[] = [
  Credentials({
    id: "otp-login",
    name: "LMS OTP Login",
    credentials: {
      phone: { label: "Phone", type: "tel" },
      otp: { label: "OTP", type: "text" },
      purpose: { label: "Purpose", type: "text" },
    },
    async authorize(credentials) {
      if (!credentials?.phone || !credentials?.otp || !credentials?.purpose)
        return null;

      try {
        // Verify OTP using the API
        const response = await axiosServer.post(
          `${API_BASE_URL}/v1/auth/verify-otp`,
          {
            phone: credentials.phone,
            otp: credentials.otp,
            purpose: credentials.purpose,
          }
        );

        const { access_token, user } = response.data;

        return {
          name: user.name,
          phone: user.phone,
          email: user.email,
          role: user.role,
          access_token,
        };
      } catch (error) {
        console.error("OTP verification failed:", error);
        return null;
      }
    },
  }),
];

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers,
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = {
          id: user.id,
          name: user.name,
          phone: user.phone,
          email: user.email,
          role: user.role,
        };
        token.access_token = user.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as typeof session.user;
      session.access_token = token.access_token as string;
      return session;
    },
  },
});
