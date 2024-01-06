import React from "react";
import { ButtonHTMLAttributes, FC } from "react";

export interface ButtonProps
  extends Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "disabled" | "aria-label"
  > {
  label: string;
  disabled?: boolean;
}

export const Button: FC<ButtonProps> = ({ label, disabled, ...props }) => {
  return (
    <button
      type="button"
      className={`text-white bg-art-primary hover:bg-art-primary-dark transition duration-100 shadow-black rounded-lg py-4 px-5 space-x-2 flex sm:whitespace-nowrap leading-tight items-center justify-center border shadow-border w-full ${
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
      }`}
      aria-label={label}
      disabled={disabled}
      {...props}
    >
      {label}
    </button>
  );
};
