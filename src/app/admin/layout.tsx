import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { COOKIE_KEYS } from "@/config/storage";
import { axiosClientNext } from "@/lib/axios.client";
import { cookies } from "next/headers";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KJO Academy | Admin Dashboard",
  description: "Manage KJO Academy LMS",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const response = await axiosClientNext.post(
    "/auth/session",
    {},
    { withCredentials: true }
  );
  console.log("response", response.headers);

  return (
    <html>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {children}
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
