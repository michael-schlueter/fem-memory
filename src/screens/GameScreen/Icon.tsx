import { cn } from "../../lib/cn";
import { icons, type IconName } from "./Icons";

type IconProps = {
  name: IconName;
  className?: string;
};

function Icon({ name, className }: IconProps) {
  return (
    <span
      aria-hidden="true"
      className={cn("inline-block bg-current", className)}
      style={{
        maskImage: `url("${icons[name]}")`,
        maskRepeat: "no-repeat",
        maskPosition: "center",
        maskSize: "contain",
      }}
    />
  );
}

export default Icon;
