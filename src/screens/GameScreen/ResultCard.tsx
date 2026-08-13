import Button from "../../components/Button";
import { cn } from "../../lib/cn";

export type ResultRow = {
  label: string;
  value: string;
  highlight?: boolean;
};

type ResultCardProps = {
  title: string;
  message: string;
  rows: ResultRow[];
  variant?: "multiplayer" | "solo";
  onRestart: () => void;
  onNewGame: () => void;
};

function ResultCard({
  title,
  message,
  rows,
  variant = "multiplayer",
  onRestart,
  onNewGame,
}: ResultCardProps) {
  return (
    <div className="flex w-[654px] max-w-full flex-col items-center justify-center rounded-[10px] bg-grey-100 p-6 md:rounded-[20px] md:px-[55px] md:py-[51px]">
      <div
        className={cn(
          "flex w-full flex-col items-center gap-6 text-center",
          variant === "solo" ? "md-gap-10" : "md-gap-14",
        )}
      >
        <div
          className={cn(
            "flex flex-col gap-2",
            variant === "solo" && "md:gap-4",
          )}
        >
          <h2 className="text-preset-7 text-blue-950 md:text-preset-2">
            {title}
          </h2>
          <p className="text-preset-12 text-blue-400 md:text-preset-9">
            {message}
          </p>
        </div>
        <dl className="flex w-full flex-col gap-2 md:gap-4">
          {rows.map((row) => (
            <div
              key={row.label}
              className={cn(
                "flex h-12 items-center justify-between rounded-[5px] px-4 md:h-[72px] md:rounded-[10px] md:px-8",
                row.highlight ? "bg-blue-950" : "bg-blue-100",
              )}
            >
              <dt
                className={cn(
                  "text-preset-12 md:text-preset-9",
                  row.highlight ? "text-grey-50" : "text-blue-400",
                )}
              >
                {row.label}
              </dt>
              <dd
                className={cn(
                  "text-preset-8 md:text-preset-5",
                  row.highlight ? "text-grey-50" : "text-blue-800",
                )}
              >
                {row.value}
              </dd>
            </div>
          ))}
        </dl>
        <div className="flex w-full flex-col items-center justify-center gap-4 md:flex-row">
          <Button
            variant="primary"
            className="w-full px-0 md:w-auto md:flex-1"
            onClick={onRestart}
          >
            Restart
          </Button>
          <Button
            variant="secondary"
            className="w-full px-0 md:w-auto md:flex-1"
            onClick={onNewGame}
          >
            Setup New Game
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ResultCard;
