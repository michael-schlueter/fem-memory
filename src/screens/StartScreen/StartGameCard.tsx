import Button from "../../components/Button";
import type { GameSettings, PlayerCount } from "../../game/memoryGame";
import ToggleButton from "./ToggleButton";
import ToggleGroupField from "./ToggleGroupField";

type StartGameCardProps = {
  settings: GameSettings;
  onChange: (settings: GameSettings) => void;
  onStart: () => void;
};

const playerCounts: PlayerCount[] = [1, 2, 3, 4];

function StartGameCard({ settings, onChange, onStart }: StartGameCardProps) {
  return (
    <div className="flex w-[654px] max-w-full flex-col gap-6 rounded-[10px] bg-grey-50 p-6 md:gap-8 md:rounded-[20px] md:p-14">
      <ToggleGroupField label="Select Theme">
        <ToggleButton
          selected={settings.theme === "numbers"}
          onClick={() => onChange({ ...settings, theme: "numbers" })}
          className="flex-1"
        >
          Numbers
        </ToggleButton>
        <ToggleButton
          selected={settings.theme === "icons"}
          onClick={() => onChange({ ...settings, theme: "icons" })}
          className="flex-1"
        >
          Icons
        </ToggleButton>
      </ToggleGroupField>

      <ToggleGroupField label="Number of Players" className="md:gap-6">
        {playerCounts.map((count) => (
          <ToggleButton
            key={count}
            selected={settings.players === count}
            onClick={() => onChange({ ...settings, players: count })}
            className="flex-1"
          >
            {count}
          </ToggleButton>
        ))}
      </ToggleGroupField>

      <ToggleGroupField label="Grid Size">
        <ToggleButton
          selected={settings.gridSize === 4}
          onClick={() => onChange({ ...settings, gridSize: 4 })}
          className="flex-1"
        >
          4x4
        </ToggleButton>
        <ToggleButton
          selected={settings.gridSize === 6}
          onClick={() => onChange({ ...settings, gridSize: 6 })}
          className="flex-1"
        >
          6x6
        </ToggleButton>
      </ToggleGroupField>

      <Button
        variant="primary"
        size="lg"
        className="mt-4 w-full md:mt-0"
        onClick={onStart}
      >
        Start Game
      </Button>
    </div>
  );
}

export default StartGameCard;
