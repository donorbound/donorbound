import { randomInt } from "node:crypto";
import { afterEach, beforeEach, describe } from "node:test";
import { expect, test, vi } from "vitest";
import { newId } from "./generate";

beforeEach(() => {
  vi.useFakeTimers();
});
afterEach(() => {
  vi.useRealTimers();
});

/**
 * Test suite for verifying that IDs are k-sorted by time.
 */
describe("ids are k-sorted by time", () => {
  const testCases = [
    {
      k: 2,
      n: 1000,
    },
    {
      k: 10,
      n: 10_000,
    },
  ];

  for (const tc of testCases) {
    /**
     * Test case for k-sorted IDs.
     * @param {number} tc.k - The k value for sorting.
     * @param {number} tc.n - The number of IDs to generate.
     */
    test(`k: ${tc.k}, n: ${tc.n}`, () => {
      const ids = Array.from({ length: tc.n })
        // eslint-disable-next-line unicorn/no-null
        .fill(null)
        .map((_, index) => {
          vi.setSystemTime(new Date(index * 10));

          return newId("donation");
        });
      const sorted = [...ids].sort();

      for (let index = 0; index < ids.length; index++) {
        expect(
          Math.abs(ids.indexOf(sorted[index]) - index),
        ).toBeLessThanOrEqual(tc.k);
      }
    });
  }
});

/**
 * Test to ensure the suffix length of IDs is between 26-28 characters.
 */
test("suffix length is between 26-28 characters long", () => {
  for (let index = 0; index < 100_000; index++) {
    vi.setSystemTime(new Date(randomInt(281_474_976_710_655)));

    const suffix = newId("donation").split("_")[1];
    expect(suffix.length).toBeGreaterThanOrEqual(26);
    expect(suffix.length).toBeLessThanOrEqual(28);
  }
});
