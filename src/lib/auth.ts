import NextAuth from "next-auth";
import { cookies } from "next/headers";
import Credentials from "next-auth/providers/credentials";
import { Provider } from "next-auth/providers";
import { axiosServer } from "@/lib/axios.server";
import { API_BASE_URL } from "@/config/api";
import { COOKIE_KEYS } from "@/config/storage";

const providers: Provider[] = [
  Credentials({
    id: "otp-login",
    name: "LMS OTP Login",
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
        const cookieStore = await cookies();
        cookieStore.set(COOKIE_KEYS.accessToken, access_token, {
          httpOnly: true,
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
        });

        return {
          name: user.name,
          phone: user.phone,
          email: user.email,
          role: user.role,
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
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as typeof session.user;
      return session;
    },
  },
});
