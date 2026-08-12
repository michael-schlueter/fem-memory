import { cn } from "../../lib/cn";

type ToggleGroupFieldProps = {
  label: string;
  className?: string;
  children: React.ReactNode;
};

function ToggleGroupField({
  label,
  className,
  children,
}: ToggleGroupFieldProps) {
  return (
    <fieldset className="flex flex-col">
      <legend className="mb-2 w-full text-preset-11 text-blue-400 md:mb-4 md:text-preset-8">
        {label}
      </legend>
      <div className={cn("flex items-center gap-2 md:gap-8", className)}>
        {children}
      </div>
    </fieldset>
  );
}

export default ToggleGroupField;
