import type { Metadata } from "next";
import { FC, ReactNode } from "react";

import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Art Paradise",
  description: "Generated by create next app",
};

interface RootLayoutProp {
  children: ReactNode;
}

const RootLayout: FC<RootLayoutProp> = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="mt-20 min-h-[calc(100vh-80px)] w-full max-w-7xl px-4 py-6 sm:mx-auto sm:px-6 sm:py-8">
        {children}
      </div>
    </>
  );
};

export default RootLayout;
