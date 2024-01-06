"use client";

import Image from "next/image";
import React from "react";

import Logo from "../assets/images/logo.png";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "./Button";

export const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();

  return (
    <nav className="border-leland-art-gray-stroke bg-leland-white relative flex h-20 items-center justify-between border-b p-4 sm:px-6">
      <Image src={Logo} alt="Logo" width={60} height={60} />
      {isLoggedIn ? <Button label="Logout" onClick={logout} /> : null}
    </nav>
  );
};
