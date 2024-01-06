"use client";

import { useAuth } from "@/contexts/AuthContext";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      redirect("/dashboard");
    } else {
      redirect("/login");
    }
  }, [currentUser]);

  return <></>;
}
