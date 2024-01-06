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
      className={`shadow-border flex w-full items-center justify-center space-x-2 rounded-lg border bg-art-primary px-5 py-4 leading-tight text-white shadow-black transition duration-100 hover:bg-art-primary-dark sm:whitespace-nowrap ${
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
