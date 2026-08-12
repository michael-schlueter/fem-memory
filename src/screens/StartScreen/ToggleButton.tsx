import type { ComponentPropsWithoutRef } from "react";
import { cn } from "../../lib/cn";

type ToggleButtonProps = ComponentPropsWithoutRef<"button"> & {
  selected: boolean;
};

function ToggleButton({
  selected,
  className,
  type = "button",
  ...props
}: ToggleButtonProps) {
  return (
    <button
      type={type}
      aria-pressed={selected}
      className={cn(
        "inline-flex h-10 cursor-pointer items-center justify-center rounded-full text-preset-10 text-grey-50 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800 md:h-[52px] md:text-preset-6 motion-safe:transition-colors",
        selected ? "bg-blue-800" : "bg-blue-300 hover:bg-blue-350",
        className,
      )}
      {...props}
    />
  );
}

export default ToggleButton;
