import IconArrowLeft from "@/svgs/icons/arrow-left";
import { useRouter } from "next/navigation";
import React from "react";

export const Back = () => {
  const router = useRouter();

  return (
    <button
      className="flex items-center space-x-2 text-art-gray-light"
      onClick={() => router.back()}
    >
      <IconArrowLeft className="h-6 w-6" />
      <span>Back</span>
    </button>
  );
};
