"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

import Logo from "../assets/images/logo.png";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { ExitIcon } from "@radix-ui/react-icons";

export const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const menuRef = useRef<HTMLDivElement>(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const usernameInitial = currentUser?.[0].toUpperCase();

  useEffect(() => {
    if (isMenuOpen) {
      const handleClick = (e: MouseEvent) => {
        if (menuRef.current?.contains(e.target as HTMLElement)) {
          return;
        }
        setIsMenuOpen(false);
      };

      document.addEventListener("mousedown", handleClick);
      return () => document.removeEventListener("mousedown", handleClick);
    }
  }, [isMenuOpen]);

  return (
    <>
      <nav className="fixed top-0 z-10 flex h-20 w-full items-center justify-between space-x-4 border-b border-art-gray-stroke bg-white p-4 sm:px-6">
        <Link href="/" className="cursor-pointer">
          <Image src={Logo} alt="Logo" width={80} height={80} />
        </Link>
        <div className="flex items-center space-x-4">
          <p className="text-art-gray-light">{currentUser}</p>
          <div ref={menuRef} className="relative">
            <button
              className="flex h-9 w-9 items-center justify-center rounded-full bg-art-primary p-2 leading-none text-white outline-none"
              onClick={() => setIsMenuOpen((prevState) => !prevState)}
            >
              {usernameInitial}
            </button>
            {isMenuOpen ? (
              <div
                className="absolute right-0 top-full mt-2 min-w-36 rounded-md border bg-white p-2 shadow-sm"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="article-options"
              >
                <button
                  className="flex w-full items-center space-x-2 rounded-md px-3 py-2 hover:bg-art-gray-hover"
                  onClick={logout}
                >
                  <ExitIcon className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </nav>
      <div className="h-20">&nbsp;</div>
    </>
  );
};
