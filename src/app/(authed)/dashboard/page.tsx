"use client";

import { Button } from "@/components/Button";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const DashboardPage = () => {
  const router = useRouter();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) {
      router.push("/login");
    }
  }, [currentUser, router]);

  return currentUser ? (
    <>
      <h1 className="mb-8 text-3xl font-medium text-art-gray-dark">
        Dashboard
      </h1>
      <Button label="Search Art" onClick={() => router.push("/search")} />
    </>
  ) : null;
};

export default DashboardPage;
