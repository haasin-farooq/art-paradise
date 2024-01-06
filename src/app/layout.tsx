import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { FC, ReactNode } from "react";
import { AuthProvider } from "@/contexts/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Art Paradise",
  description:
    "Discover a world of creativity at Art Paradise. Our online gallery is a curated selection of fine art across various mediums and eras.",
};

interface RootLayoutProp {
  children: ReactNode;
}

const RootLayout: FC<RootLayoutProp> = ({ children }) => {
  return (
    <html lang="en">
      <body className={`min-h-screen ${inter.className}`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;
