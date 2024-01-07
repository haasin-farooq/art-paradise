"use client";

import { FC, ReactNode, useEffect } from "react";

import { Navbar } from "@/components/Navbar";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

interface RootLayoutProp {
  children: ReactNode;
}

const RootLayout: FC<RootLayoutProp> = ({ children }) => {
  const router = useRouter();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) {
      router.push("/login");
    }
  }, [currentUser, router]);
  return currentUser ? (
    <>
      <Navbar />
      <div className="mt-20 min-h-[calc(100vh-80px)] w-full max-w-7xl px-4 py-6 sm:mx-auto sm:px-6 sm:py-8">
        {children}
      </div>
    </>
  ) : null;
};

export default RootLayout;
