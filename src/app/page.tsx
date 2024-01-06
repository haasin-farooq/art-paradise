"use client";

import { useAuth } from "@/contexts/AuthContext";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      redirect("/dashboard");
    } else {
      redirect("/login");
    }
  }, [isLoggedIn]);

  return <></>;
}
