"use client";

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

  return !currentUser ? null : <div>Dashboard</div>;
};

export default DashboardPage;
