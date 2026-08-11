import { useEffect, useReducer } from "react";
import {
  createDeck,
  createInitialState,
  gameReducer,
  type GameSettings,
} from "./memoryGame";

const MISMATCH_DELAY_MS = 1000;

export function useMemoryGame(settings: GameSettings) {
  const [state, dispatch] = useReducer(gameReducer, settings, (initial) =>
    createInitialState(initial, createDeck(initial.gridSize)),
  );

  /* Flip a mismatched pair back after a beat, unless the player resolves
  it earlier by flipping a third tile. Two flipped indices always indicate 
  a mismatch (matched cards are instantly stored in matched) */
  const mismatch = state.flipped.length === 2;
  useEffect(() => {
    if (!mismatch) return;
    const timeout = setTimeout(
      () => dispatch({ type: "resolve" }),
      MISMATCH_DELAY_MS,
    );
    return () => clearTimeout(timeout);
  }, [mismatch, state.flipped]);

  // Solo timer: runs from the first flip until the game is won (multiplayer games are paced by turns)
  const timerRunning =
    settings.players === 1 && state.started && state.status === "playing";
  useEffect(() => {
    if (!timerRunning) return;
    const interval = setInterval(() => dispatch({ type: "tick" }), 1000);
    return () => clearInterval(interval);
  }, [timerRunning]);

  return {
    state,
    flip: (index: number) => dispatch({ type: "flip", index }),
    restart: () =>
      dispatch({ type: "restart", deck: createDeck(settings.gridSize) }),
  };
}
