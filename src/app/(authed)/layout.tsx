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
  const { currentUser, isLoading } = useAuth();

  useEffect(() => {
    if (!currentUser && !isLoading) {
      router.push("/login");
    }
  }, [currentUser, isLoading, router]);

  return currentUser ? (
    <>
      <Navbar />
      <div className="min-h-[calc(100vh-80px)] w-full max-w-7xl px-4 py-6 sm:mx-auto sm:px-6 sm:py-8">
        {children}
      </div>
    </>
  ) : null;
};

export default RootLayout;
