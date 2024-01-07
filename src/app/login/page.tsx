"use client";

import Image from "next/image";

import { Button, ButtonWidth } from "@/components/Button";
import Input from "@/components/Input";

import LoginImage from "../../assets/images/login-image.png";
import Logo from "../../assets/images/logo.png";
import { useEffect, useState } from "react";
import { UserCredentials } from "@/utils/types";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

const LoginPage = () => {
  const router = useRouter();
  const { currentUser, isLoading, login, errorMessage } = useAuth();

  const [userCredentials, setUserCredentials] = useState<UserCredentials>({
    email: "",
    password: "",
  });

  const disabled =
    !userCredentials.email || !userCredentials.password || isLoading;

  useEffect(() => {
    if (currentUser) {
      router.push("/dashboard");
    }
  }, [currentUser, router]);

  return currentUser ? null : (
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
        <h2 className="text-center text-2xl font-medium">
          Log in to your Art Paradise account
        </h2>
        <div className="flex w-full max-w-md flex-col space-y-3 sm:w-3/4">
          <Input
            type="email"
            placeholder="Enter email"
            value={userCredentials.email}
            onChange={(e) =>
              setUserCredentials({
                ...userCredentials,
                email: e.target.value,
              })
            }
          />
          <Input
            type="password"
            placeholder="Enter password"
            value={userCredentials.password}
            onChange={(e) =>
              setUserCredentials({
                ...userCredentials,
                password: e.target.value,
              })
            }
          />
          <Button
            label="Login"
            width={ButtonWidth.FULL}
            disabled={disabled}
            onClick={() => login(userCredentials)}
          />
          <p className="text-red-500">{errorMessage}</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
