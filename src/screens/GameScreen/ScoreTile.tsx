import { cn } from "../../lib/cn";

type ScoreTileProps = {
  label: string;
  value: string | number;
  active?: boolean;
};

function ScoreTile({ label, value, active }: ScoreTileProps) {
  return (
    <div
      className={cn(
        "flex h-[70px] w-full flex-col items-center justify-center rounded-[5px] md:h-[72px] md:flex-row md:justify-between md:rounded-[10px] md:px-[22px]",
        active ? "bg-orange-400" : "bg-blue-100",
      )}
    >
      <span
        className={cn(
          "text-preset-11 md:text-preset-9",
          active ? "text-grey-50" : "text-blue-400",
        )}
      >
        {label}
      </span>
      <span
        className={cn(
          "text-preset-7 md:text-preset-5",
          active ? "text-grey-50" : "text-blue-800",
        )}
      >
        {value}
      </span>
    </div>
  );
}

export default ScoreTile;
