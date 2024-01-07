"use client";

import { useAuth } from "@/contexts/AuthContext";
import { redirect } from "next/navigation";
import { useEffect } from "react";

const HomePage = () => {
  const { currentUser, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (currentUser) {
        redirect("/dashboard");
      } else {
        redirect("/login");
      }
    }
  }, [currentUser, isLoading]);

  return <></>;
};

export default HomePage;
