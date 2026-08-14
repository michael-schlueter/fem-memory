import type { GridSize, Theme, TileStatus } from "../../game/memoryGame";
import { cn } from "../../lib/cn";
import Icon from "./Icon";
import { iconNames } from "./Icons";

type TileProps = {
  value: number;
  theme: Theme;
  status: TileStatus;
  gridSize: GridSize;
  onFlip: () => void;
};

function tileLabel(value: number, theme: Theme, status: TileStatus) {
  if (status === "hidden") return "Face-down tile";
  const face =
    theme === "numbers" ? value : iconNames[(value - 1) % iconNames.length];
  return status === "matched" ? `Matched tile: ${face}` : `Tile: ${face}`;
}

function Tile({ value, theme, status, gridSize, onFlip }: TileProps) {
  return (
    <button
      type="button"
      onClick={() => status === "hidden" && onFlip()}
      aria-disabled={status !== "hidden"}
      aria-label={tileLabel(value, theme, status)}
      className={cn(
        "flex aspect-square w-full items-center justify-center rounded-full text-grey-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800 motion-safe:transition-colors",
        gridSize === 6
          ? "text-preset-7 md:text-preset-3"
          : "text-preset-4 md:text-preset-1",
        status === "hidden" && "cursor-pointer bg-blue-800 hover:bg-blue-350",
        status === "flipped" && "bg-orange-400",
        status === "matched" && "bg-blue-300",
      )}
    >
      {status !== "hidden" &&
        (theme === "numbers" ? (
          value
        ) : (
          <Icon
            name={iconNames[(value - 1) % iconNames.length]}
            className={
              gridSize === 6 ? "size-6 md:size-10" : "size-[35px] md:size-14"
            }
          />
        ))}
    </button>
  );
}

export default Tile;
