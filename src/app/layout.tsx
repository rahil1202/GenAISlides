import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/provider/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import {ClerkProvider} from "@clerk/nextjs";
import {dark} from "@clerk/themes"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GenAISlides",
  description: "GenAISlides is a AI slides generator.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider 
    appearance={{
      baseTheme:dark
    }}
    >
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
      <ThemeProvider
      attribute={"class"}
      defaultTheme={"dark"}
      disableTransitionOnChange
      enableSystem
      >
        {children}
        <Toaster />
      </ThemeProvider>
        
      </body>
    </html>
    </ClerkProvider>
  );
}
