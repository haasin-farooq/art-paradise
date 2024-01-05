import React from "react";

import Logo from "../assets/images/logo.png";
import Image from "next/image";

export const Navbar = () => {
  return (
    <nav className="relative flex items-center justify-between border-b border-leland-gray-stroke bg-leland-white p-4 h-20 sm:px-6">
      <Image src={Logo} alt="Logo" width={60} height={60} />
    </nav>
  );
};
