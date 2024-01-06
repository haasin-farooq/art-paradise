"use client";

import React from "react";
import type { ChangeEventHandler, InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  error?: string;
};

const Input: React.FC<InputProps> = ({
  className,
  onChange,
  error,
  prefix,
  onBlur,
  ...inputProps
}) => {
  return (
    <div className={className}>
      <input
        className="block w-full bg-white p-4 shadow-none outline-none outline-0 ring-0 placeholder:text-art-gray-400 rounded-lg border border-art-gray-stroke transition duration-100 focus-within:border-art-gray-extra-light"
        {...inputProps}
        onChange={(e) => onChange?.(e)}
        onBlur={onBlur}
      />
      {/* {error?.message ? <ErrorMessage errorMessage={error.message} /> : null} */}
    </div>
  );
};

export default Input;
