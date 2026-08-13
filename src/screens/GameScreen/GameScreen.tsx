import {
  tileStatus,
  type GameSettings,
  type GameState,
} from "../../game/memoryGame";
import { useMemoryGame } from "../../game/useMemoryGame";
import MenuBar from "./MenuBar";
import Modal from "./Modal";
import PlayerScore from "./PlayerScore";
import ResultCard, { type ResultRow } from "./ResultCard";
import ScoreTile from "./ScoreTile";
import Tile from "./Tile";

type GameScreenProps = {
  settings: GameSettings;
  onNewGame: () => void;
};

function formatTime(seconds: number) {
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}

function soloResult(state: GameState): { title: string; rows: ResultRow[] } {
  return {
    title: "You did it!",
    rows: [
      { label: "Time Elpased", value: formatTime(state.seconds) },
      { label: "Moves Taken", value: `${state.moves} Moves` },
    ],
  };
}

function multiPlayerResult(state: GameState): {
  title: string;
  rows: ResultRow[];
} {
  const ranked = state.scores
    .map((pairs, index) => ({ player: index + 1, pairs }))
    .sort((a, b) => b.pairs - a.pairs);
  const best = ranked[0].pairs;
  const winners = ranked.filter((entry) => entry.pairs === best);
  return {
    title:
      winners.length > 1 ? "It's a tie!" : `Player ${winners[0].player} Wins!`,
    rows: ranked.map((entry) => ({
      label: `Player ${entry.player}${entry.pairs === best ? " (Winner!)" : ""}`,
      value: `${entry.pairs} Pairs`,
      highlight: entry.pairs === best,
    })),
  };
}

export const GameScreen = ({ settings, onNewGame }: GameScreenProps) => {
  const { state, flip, restart } = useMemoryGame(settings);
  const solo = settings.players === 1;
  const won = state.status === "won";
  const result = won
    ? solo
      ? soloResult(state)
      : multiPlayerResult(state)
    : null;

  return (
    <div className="flex min-h-dvh flex-col bg-grey-50 p-6 md:p-10 xl:px-10 xl:py-[67px]">
      <div className="mx-auto flex w-full max-w-[1110px] flex-1 flex-col">
        <MenuBar onRestart={restart} onNewGame={onNewGame} />

        <main className="flex flex-1 flex-col">
          <div className="flex flex-1 items-center justify-center py-8">
            <div
              role="group"
              aria-label="Memory game board"
              className={
                settings.gridSize === 6
                  ? "grid w-full max-w-[572px] grid-cols-6 gap-2 md:gap-4"
                  : "grid w-full max-w-[544px] grid-cols-4 gap-3 md:gap-6"
              }
            >
              {state.deck.map((value, index) => (
                <Tile
                  key={index}
                  value={value}
                  theme={settings.theme}
                  status={tileStatus(state, index)}
                  gridSize={settings.gridSize}
                  onFlip={() => flip(index)}
                />
              ))}
            </div>
          </div>

          {solo ? (
            <div className="flex justify-center gap-6 md:gap-8">
              <div className="w-full max-w-[255px]">
                <ScoreTile label="Time" value={formatTime(state.seconds)} />
              </div>
              <div className="w-full max-w-[255px]">
                <ScoreTile label="Moves" value={state.moves} />
              </div>
            </div>
          ) : (
            <div className="flex justify-center gap-6 md:gap-2 xl:gap-8">
              {state.scores.map((score, index) => (
                <div key={index} className="w-16 md:w-[166px] xl:w-[255px]">
                  <PlayerScore
                    playerNumber={index + 1}
                    score={score}
                    isCurrent={!won && state.currentPlayer === index}
                  />
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
      <Modal open={won} aria-label="Game results">
        {result && (
          <ResultCard
            title={result.title}
            variant={solo ? "solo" : "multiplayer"}
            message={
              solo
                ? "Game over! Here's how you got on..."
                : "Game over! Here are the results..."
            }
            rows={result.rows}
            onRestart={restart}
            onNewGame={onNewGame}
          />
        )}
      </Modal>
    </div>
  );
};
