import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

import AuthProvider from "@/components/AuthProvider";

import StyledComponentsRegistry from "@/lib/AntdRegistry";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "erp pupuk",
  description: "erp pupuk",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={inter.className}>
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        </body>
      </html>
    </AuthProvider>
  );
}
