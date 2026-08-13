import { describe, expect, it } from "vitest";
import {
  createDeck,
  createInitialState,
  gameReducer,
  tileStatus,
  type GameAction,
  type GameSettings,
  type GameState,
} from "./memoryGame";

const multiplayerSettings: GameSettings = {
  theme: "numbers",
  players: 4,
  gridSize: 4,
};

const soloSettings: GameSettings = {
  theme: "numbers",
  players: 1,
  gridSize: 4,
};

// Deterministic 2-pair board
const smallDeck = [1, 1, 2, 2];

/* Starting from state, feed each action into gameReducer one at a time
using each result as the input to the next call */
function play(state: GameState, ...actions: GameAction[]): GameState {
  return actions.reduce(gameReducer, state);
}

describe("createDeck", () => {
  it("builds gridSize² tiles with every value appearing exactly twice", () => {
    for (const gridSize of [4, 6] as const) {
      const deck = createDeck(gridSize);

      // Check if deck has the correct size
      expect(deck).toHaveLength(gridSize * gridSize);
      const counts = new Map<number, number>();

      // Check if every value is included exactly twice
      for (const value of deck) {
        counts.set(value, (counts.get(value) ?? 0) + 1);
      }
      expect(counts.size).toBe((gridSize * gridSize) / 2);

      for (const count of counts.values()) expect(count).toBe(2);
    }
  });

  it("applies a Fisher-Yates shuffle driven by the injected random source", () => {
    expect(createDeck(4, () => 0)).toEqual([
      2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8, 1,
    ]);

    // Returns the top of the range, so every swap is a no-op
    expect(createDeck(4, () => 0.999999)).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8,
    ]);
  });
});

describe("flip", () => {
  it("reveals a single flipped tile and marks the game started", () => {
    const state = play(createInitialState(multiplayerSettings, smallDeck), {
      type: "flip",
      index: 0,
    });
    expect(state.flipped).toEqual([0]);
    expect(state.started).toBe(true);
    expect(tileStatus(state, 0)).toBe("flipped");
  });

  it("ignores flipping the same tile twice", () => {
    const state = play(
      createInitialState(multiplayerSettings, smallDeck),
      { type: "flip", index: 0 },
      { type: "flip", index: 0 },
    );
    expect(state.flipped).toEqual([0]);
    expect(state.moves).toBe(0);
  });

  it("scores a matching pair for the current player, who keeps the turn", () => {
    const state = play(
      createInitialState(multiplayerSettings, smallDeck),
      { type: "flip", index: 0 },
      { type: "flip", index: 1 },
    );
    expect(state.matched).toEqual([0, 1]);
    expect(state.flipped).toEqual([]);
    expect(state.scores).toEqual([1, 0, 0, 0]);
    expect(state.currentPlayer).toBe(0);
    expect(state.moves).toBe(1);
    expect(tileStatus(state, 0)).toBe("matched");
  });

  it("keeps a mismatched pair face up until resolved", () => {
    const state = play(
      createInitialState(multiplayerSettings, smallDeck),
      { type: "flip", index: 0 },
      { type: "flip", index: 2 },
    );
    expect(state.flipped).toEqual([0, 2]);
    expect(state.scores).toEqual([0, 0, 0, 0]);
    expect(state.moves).toBe(1);
  });

  it("ignores flips on matched tiles", () => {
    const state = play(
      createInitialState(multiplayerSettings, smallDeck),
      { type: "flip", index: 0 },
      { type: "flip", index: 1 },
      { type: "flip", index: 0 },
    );
    expect(state.flipped).toEqual([]);
    expect(state.matched).toEqual([0, 1]);
  });

  it("resolves a pending mismatch when a third tile is flipped", () => {
    const state = play(
      createInitialState(multiplayerSettings, smallDeck),
      { type: "flip", index: 0 },
      { type: "flip", index: 2 },
      { type: "flip", index: 3 },
    );
    expect(state.flipped).toEqual([3]);
    expect(state.currentPlayer).toBe(1);
  });

  it("wins the game when the last pair is matched", () => {
    const state = play(
      createInitialState(multiplayerSettings, smallDeck),
      { type: "flip", index: 0 },
      { type: "flip", index: 1 },
      { type: "flip", index: 2 },
      { type: "flip", index: 3 },
    );
    expect(state.status).toBe("won");
    expect(state.matched).toEqual([0, 1, 2, 3]);
    expect(state.scores).toEqual([2, 0, 0, 0]);
  });

  it("ignores flips after the game is won", () => {
    const won = play(
      createInitialState(soloSettings, smallDeck),
      { type: "flip", index: 0 },
      { type: "flip", index: 1 },
      { type: "flip", index: 2 },
      { type: "flip", index: 3 },
    );
    expect(gameReducer(won, { type: "flip", index: 0 })).toBe(won);
  });
});

describe("resolve", () => {
  it("hides a mismatched pair and passes the turn to the next player", () => {
    const state = play(
      createInitialState(multiplayerSettings, smallDeck),
      { type: "flip", index: 0 },
      { type: "flip", index: 2 },
      { type: "resolve" },
    );
    expect(state.flipped).toEqual([]);
    expect(state.currentPlayer).toBe(1);
    expect(tileStatus(state, 0)).toBe("hidden");
  });

  it("wraps the turn back to the first player", () => {
    let state = createInitialState(multiplayerSettings, smallDeck);
    for (let round = 0; round < 4; round++) {
      state = play(
        state,
        { type: "flip", index: 0 },
        { type: "flip", index: 2 },
        { type: "resolve" },
      );
    }
    expect(state.currentPlayer).toBe(0);
  });

  it("does nothing without a pending mismatch", () => {
    const state = createInitialState(multiplayerSettings, smallDeck);
    expect(gameReducer(state, { type: "resolve" })).toBe(state);
  });
});

describe("tick", () => {
  it("counts seconds only while a started game is running", () => {
    const initial = createInitialState(soloSettings, smallDeck);
    expect(gameReducer(initial, { type: "tick" }).seconds).toBe(0);

    const started = play(initial, { type: "flip", index: 0 }, { type: "tick" });
    expect(started.seconds).toBe(1);

    const won = play(
      started,
      { type: "flip", index: 1 },
      { type: "flip", index: 2 },
      { type: "flip", index: 3 },
    );
    expect(gameReducer(won, { type: "tick" }).seconds).toBe(won.seconds);
  });
});

describe("restart", () => {
  it("resets everything but the settings, using the new deck", () => {
    const played = play(
      createInitialState(multiplayerSettings, smallDeck),
      { type: "flip", index: 0 },
      { type: "flip", index: 1 },
      { type: "flip", index: 2 },
      { type: "tick" },
    );
    const newDeck = [2, 2, 1, 1];
    const state = gameReducer(played, { type: "restart", deck: newDeck });
    expect(state).toEqual({
      ...createInitialState(multiplayerSettings, newDeck),
      announcement: 'New game started.'
    });
  });
});

describe("announcements", () => {
  it("narrates a multiplayer mismatch, match, and win", () => {
    const resolved = play(
      createInitialState(multiplayerSettings, smallDeck),
      { type: "flip", index: 0 },
      { type: "flip", index: 2 },
      { type: "resolve" },
    );
    expect(resolved.announcement).toBe("No match. Player 2's turn.");

    const matched = play(
      resolved,
      { type: "flip", index: 0 },
      { type: "flip", index: 1 },
    );
    expect(matched.announcement).toBe(
      "Pair matched. Player 2 scores and goes again.",
    );

    const won = play(
      matched,
      { type: "flip", index: 2 },
      { type: "flip", index: 3 },
    );
    expect(won.announcement).toBe("Pair matched. Game over!");
  });

  it("omits turn talk in solo games", () => {
    const state = play(
      createInitialState(soloSettings, smallDeck),
      { type: "flip", index: 0 },
      { type: "flip", index: 2 },
      { type: "resolve" },
    );
    expect(state.announcement).toBe("No match.");
  });
});
