import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { I18nProvider } from "@/lib/i18n-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Camila Rueda | UX/UI Designer & Frontend Developer",
  description:
    "Portfolio of Camila Rueda - Senior Frontend Developer and UX/UI Designer specializing in creating beautiful, user-centered digital experiences with pixel-perfect precision.",
  keywords: [
    "UX/UI Designer",
    "Frontend Developer",
    "React",
    "Next.js",
    "Portfolio",
    "Web Design",
    "User Experience",
  ],
  authors: [{ name: "Camila Rueda" }],
  openGraph: {
    title: "Camila Rueda | UX/UI Designer & Frontend Developer",
    description:
      "Senior Frontend Developer crafting beautiful, user-centered digital experiences.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          src="https://cdn.platform.openai.com/deployments/chatkit/chatkit.js"
          async
        ></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
