import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Commissioner } from "next/font/google";
import "./globals.css";
import Providers from "@/providers";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

const inter = Inter({ subsets: ["latin"] });
const commissioner = Commissioner({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GPT App",
  description: "Explore the world with the help of AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en">
        <body className={commissioner.className}>
          <Providers>{children}</Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
