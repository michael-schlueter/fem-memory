import { useState } from "react";
import type { GameSettings } from "./game/memoryGame";
import { StartScreen } from "./screens/StartScreen";
import { GameScreen } from "./screens/GameScreen";

function App() {
  const [gameSettings, setGameSettings] = useState<GameSettings | null>(null)

  if (gameSettings === null) {
    return <StartScreen onStart={setGameSettings} />
  }

  return (
    <GameScreen
      settings={gameSettings}
      onNewGame={() => setGameSettings(null)}
    />
  );
}

export default App;
