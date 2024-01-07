"use client";

import Image from "next/image";

import { Button, ButtonWidth } from "@/components/Button";
import Input from "@/components/Input";

import LoginImage from "../../assets/images/login-image.png";
import Logo from "../../assets/images/logo.png";
import { BaseSyntheticEvent, useEffect, useState } from "react";
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

  const handleSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    login(userCredentials);
  };

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
      <div className="col-span-12 mt-20 flex flex-col items-center justify-center space-y-8 p-8 sm:col-span-8 sm:mt-0 sm:p-20">
        <Image src={Logo} alt="Logo" width={100} height={100} />
        <h2 className="text-center text-2xl font-medium">
          Log in to your Art Paradise account
        </h2>
        <form
          className="flex w-full max-w-md flex-col space-y-3 sm:w-3/4"
          onSubmit={(e) => handleSubmit(e)}
        >
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
            type="submit"
            label="Login"
            width={ButtonWidth.FULL}
            disabled={disabled}
          />
          <p className="text-red-500">{errorMessage}</p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
