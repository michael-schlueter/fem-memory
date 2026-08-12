import { useState } from "react";
import type { GameSettings } from "../../game/memoryGame";
import StartGameCard from "./StartGameCard";

type StartScreenProps = {
  onStart: (settings: GameSettings) => void;
};

const defaultSettings: GameSettings = {
  theme: "numbers",
  players: 1,
  gridSize: 4,
};

function StartScreen({ onStart }: StartScreenProps) {
  const [settings, setSettings] = useState<GameSettings>(defaultSettings);

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-12 bg-blue-950 px-6 py-12 md:gap-20">
      <h1 className="text-preset-5 text-grey-50 md:text-preset-4">memory</h1>
      <StartGameCard
        settings={settings}
        onChange={setSettings}
        onStart={() => onStart(settings)}
      />
    </main>
  );
}

export default StartScreen;
