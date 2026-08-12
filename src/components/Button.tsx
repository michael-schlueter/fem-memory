import type { ComponentPropsWithoutRef } from "react";
import { cn } from "../lib/cn";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
};

function Button({
  variant = "primary",
  size = "md",
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex cursor-pointer items-center justify-center rounded-full whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800 motion-safe:transition-colors",
        variant === "primary" &&
          "bg-orange-400 text-grey-50 hover:bg-orange-300",
        variant === "secondary" &&
          "bg-blue-100 text-blue-800 hover:bg-blue-350 hover:text-grey-50",
        size === "sm" && "h-10 px-5 text-preset-10",
        size === "md" &&
          "h-12 px-6 text-preset-9 md:h-[52px] md:px-7 md:text-preset-8",
        size === "lg" &&
          "h-12 px-6 text-preset-9 md:h-[70px] md:px-8 md:text-preset-5",
        className,
      )}
      {...props}
    />
  );
}

export default Button;
