import { cn } from "../../lib/cn";
import currentTurnArrow from "../../assets/current-turn-arrow.svg";

type PlayerScoreProps = {
  playerNumber: number;
  score: number;
  isCurrent: boolean;
};

function PlayerScore({ playerNumber, score, isCurrent }: PlayerScoreProps) {
  return (
    <div className="flex w-full flex-col items-center xl:gap-6">
      <div className="relative flex w-full flex-col items-center">
        {isCurrent && (
          <img
            src={currentTurnArrow}
            alt=""
            className="absolute -top-2 h-2 w-4 md:-top-3 md:h-3 md:w-6 xl:-top-[19px] xl:h-[19px] xl:w-[38ppx]"
          />
        )}
        <div
          className={cn(
            "flex h-[70px] w-full flex-col items-center justify-center rounded-[5px] md:h-20 md:items-start md:gap-2 md:rounded-[10px] md:px-4 xl:h-[72px] xl:flex-row xl:items-center xl:justify-between xl:gap-0 xl:px-[22px]",
            isCurrent ? "bg-orange-400" : "bg-blue-100",
          )}
        >
          <span
            className={cn(
              "text-preset-11 xl:text-preset-9",
              isCurrent ? "text-grey-50" : "text-blue-400",
            )}
          >
            <span className="md:hidden">P{playerNumber}</span>
            <span className="hidden md:inline">Player {playerNumber}</span>
          </span>
          <span
            className={cn(
              "text-preset-7 xl:text-preset-5",
              isCurrent ? "text-grey-50" : "text-blue-800",
            )}
          >
            {score}
          </span>
        </div>
      </div>
      <p
        className={cn(
          "hidden text-center text-preset-13 tracking-[5px] text-blue-950 uppercase xl:block",
          !isCurrent && "xl:invisible",
        )}
      >
        Current turn
      </p>
    </div>
  );
}

export default PlayerScore;
