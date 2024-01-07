import type { ChangeEventHandler, InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};

const Input: React.FC<InputProps> = ({
  className,
  onChange,
  ...inputProps
}) => {
  return (
    <input
      className={`placeholder:text-art-gray-400 block w-full rounded-lg border border-art-gray-stroke bg-white p-4 shadow-none outline-none outline-0 ring-0 transition duration-100 focus-within:border-art-gray-extra-light ${className}`}
      {...inputProps}
      onChange={(e) => onChange?.(e)}
    />
  );
};

export default Input;
