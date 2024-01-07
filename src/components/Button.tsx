import { ButtonHTMLAttributes, FC } from "react";

export enum ButtonWidth {
  FULL = "FULL",
  AUTO = "AUTO",
}

const ButtonWidthToStyles: Record<ButtonWidth, string> = {
  [ButtonWidth.FULL]: "flex w-full",
  [ButtonWidth.AUTO]: "w-fit",
};
export interface ButtonProps
  extends Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "disabled" | "aria-label"
  > {
  label: string;
  width?: ButtonWidth;
  disabled?: boolean;
}

export const Button: FC<ButtonProps> = ({
  label,
  width = ButtonWidth.AUTO,
  disabled,
  ...props
}) => {
  return (
    <button
      type="button"
      className={`shadow-border flex items-center justify-center space-x-2 rounded-lg border bg-art-primary px-5 py-4 leading-tight text-white shadow-black transition duration-100 hover:bg-art-primary-dark sm:whitespace-nowrap ${
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
      } ${ButtonWidthToStyles[width]}`}
      aria-label={label}
      disabled={disabled}
      {...props}
    >
      {label}
    </button>
  );
};
