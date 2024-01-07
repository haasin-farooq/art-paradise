import { useRouter } from "next/navigation";
import React from "react";
import { ArrowLeftIcon } from "@radix-ui/react-icons";

export const Back = () => {
  const router = useRouter();

  return (
    <button
      className="flex items-center space-x-2 text-art-gray-light"
      onClick={() => router.back()}
    >
      <ArrowLeftIcon className="h-5 w-5" />
      <span>Back</span>
    </button>
  );
};
