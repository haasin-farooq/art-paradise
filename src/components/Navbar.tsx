import Image from "next/image";
import React from "react";

import Logo from "../assets/images/logo.png";

export const Navbar = () => {
  return (
    <nav className="border-leland-art-gray-stroke bg-leland-white relative flex h-20 items-center justify-between border-b p-4 sm:px-6">
      <Image src={Logo} alt="Logo" width={60} height={60} />
    </nav>
  );
};
