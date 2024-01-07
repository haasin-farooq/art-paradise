import { ButtonHTMLAttributes, FC } from "react";

export enum ButtonWidth {
  FULL = "FULL",
  AUTO = "AUTO",
}

export enum ButtonColor {
  PRIMARY = "PRIMARY",
  GRAY = "GRAY",
}

const ButtonWidthToStyles: Record<ButtonWidth, string> = {
  [ButtonWidth.FULL]: "flex w-full",
  [ButtonWidth.AUTO]: "w-fit",
};

const ButtonColorToStyles: Record<ButtonColor, string> = {
  [ButtonColor.PRIMARY]:
    "border bg-art-primary hover:bg-art-primary-dark text-white",
  [ButtonColor.GRAY]:
    "border bg-white border-art-gray-stroke hover:bg-art-gray-hover",
};

export interface ButtonProps
  extends Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "disabled" | "aria-label"
  > {
  label: string;
  color?: ButtonColor;
  width?: ButtonWidth;
  disabled?: boolean;
}

export const Button: FC<ButtonProps> = ({
  label,
  color = ButtonColor.PRIMARY,
  width = ButtonWidth.AUTO,
  disabled,
  ...props
}) => {
  return (
    <button
      type="button"
      className={`flex items-center justify-center space-x-2 rounded-lg px-5 py-4 leading-tight shadow-black transition duration-100 sm:whitespace-nowrap ${
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
      } ${ButtonWidthToStyles[width]} ${ButtonColorToStyles[color]}`}
      aria-label={label}
      disabled={disabled}
      {...props}
    >
      {label}
    </button>
  );
};
