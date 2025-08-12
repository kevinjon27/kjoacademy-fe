import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KJO Academy - Learn Cryptocurrency Trading",
  description:
    "Master the world of digital currencies with our comprehensive learning courses",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} dark antialiased`}
      >
        <div className="min-h-screen flex flex-col">
          <NextIntlClientProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </NextIntlClientProvider>
        </div>
      </body>
    </html>
  );
}
