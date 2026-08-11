export type TileStatus = "hidden" | "flipped" | "matched";
export type GameStatus = "playing" | "won";
export type Theme = "numbers" | "icons";
export type GridSize = 4 | 6;
export type PlayerCount = 1 | 2 | 3 | 4;

// Config chosen by the player
export type GameSettings = {
  theme: Theme;
  players: PlayerCount;
  gridSize: GridSize;
};

// Reducer state
export type GameState = {
  settings: GameSettings;
  // Pair value at each board position e.g., [1, 2, 2, 1] for 2x2 board
  deck: number[];
  // Board indices currently flipped (not values), needs to be either empty or include one or two tiles face-up and unresolved
  flipped: number[];
  // Board indices permanently face-up because they've been matched
  matched: number[];
  // Pairs found per player (index = player - 1)
  scores: number[];
  currentPlayer: number;
  // Count of completed flip-pairs (both match & mismatch increment it once)
  moves: number;
  // Elapsed game timer
  seconds: number;
  // Flips to true on the very first tile flip
  started: boolean;
  status: GameStatus;
};

export type GameAction =
  // Dispatched when the player clicks a tile, index is the board position being turned face-up
  | { type: "flip"; index: number }
  // Flips two mismatched cards back
  | { type: "resolve" }
  // Dispatched once per seconds to increment seconds
  | { type: "tick" }
  // Keeps the current settings but restarts game with freshly shuffled deck
  | { type: "restart"; deck: number[] };

// Builds a shuffled array of pair-values sized to fill the board
export function createDeck(
  gridSize: GridSize,
  random: () => number = Math.random,
): number[] {
  const pairs = (gridSize * gridSize) / 2;

  // Create unshuffled deck
  const pairValues = [];
  for (let value = 1; value <= pairs; value++) pairValues.push(value);
  const deck = [...pairValues, ...pairValues];

  // Fisher-Yates shuffle in place
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }

  return deck;
}

export function createInitialState(
  settings: GameSettings,
  deck: number[],
): GameState {
  return {
    settings,
    deck,
    flipped: [],
    matched: [],
    // returns 0 for each player
    scores: Array.from({ length: settings.players }, () => 0),
    currentPlayer: 0,
    moves: 0,
    seconds: 0,
    started: false,
    status: 'playing',
  }
}