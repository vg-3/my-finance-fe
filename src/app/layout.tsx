import Providers from "./providers";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";

import "./globals.css";
import { AuthInitializer } from "@/components/auth/AuthInitailizer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} antialiased`}>
        <Providers>
          <AuthInitializer>
            <div className="bg-background h-screen max-w-2xl m-auto">
              <div className="hidden sm:flex items-center justify-center h-full flex-col font-bold gap-2">
                <p>This Application is not available on larger screens</p>
                <p>Please switch to a mobile device</p>
              </div>
              <div className="sm:hidden h-full">
                {children}
                <Toaster position="top-center" duration={1000} />
              </div>
            </div>
          </AuthInitializer>
        </Providers>
      </body>
    </html>
  );
}
