import { describe, expect, it } from "vitest";
import { createDeck } from "./memoryGame";

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
