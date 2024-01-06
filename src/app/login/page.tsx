"use client";

import Image from "next/image";

import { Button } from "@/components/Button";
import Input from "@/components/Input";

import LoginImage from "../../assets/images/login-image.png";
import Logo from "../../assets/images/logo.png";
import { useEffect, useState } from "react";
import { User } from "@/utils/types";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

const LoginPage = () => {
  const router = useRouter();
  const { isLoggedIn, isLoading, login } = useAuth();

  const [userInfo, setUserInfo] = useState<User>({
    username: "",
    email: "",
    password: "",
    last_login_date: null,
  });

  const disabled = !userInfo.username || !userInfo.email || !userInfo.password;

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/dashboard");
    }
  }, [isLoggedIn, router]);

  return isLoading || isLoggedIn ? null : (
    <div className="grid h-full grid-cols-12">
      <div className="relative col-span-4 hidden h-full min-h-screen sm:block">
        <Image
          className="object-cover object-center"
          src={LoginImage}
          fill
          alt="Login page artwork"
        />
      </div>
      <div className="col-span-12 flex flex-col items-center space-y-8 p-8 sm:col-span-8 sm:justify-center sm:p-20">
        <Image src={Logo} alt="Logo" width={100} height={100} />
        <h2 className="text-center text-2xl font-medium text-art-gray-dark">
          Log in to your Art Paradise account
        </h2>
        <div className="flex w-full max-w-md flex-col space-y-3 sm:w-3/4">
          <Input
            type="text"
            placeholder="Enter username"
            value={userInfo.username}
            onChange={(e) =>
              setUserInfo({
                ...userInfo,
                username: e.target.value,
              })
            }
          />
          <Input
            type="email"
            placeholder="Enter email"
            value={userInfo.email}
            onChange={(e) =>
              setUserInfo({
                ...userInfo,
                email: e.target.value,
              })
            }
          />
          <Input
            type="password"
            placeholder="Enter password"
            value={userInfo.password}
            onChange={(e) =>
              setUserInfo({
                ...userInfo,
                password: e.target.value,
              })
            }
          />
          <Button
            label="Login"
            disabled={disabled}
            onClick={() => login(userInfo.username)}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
