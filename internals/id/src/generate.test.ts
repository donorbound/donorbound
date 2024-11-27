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
    test(`k: ${tc.k}, n: ${tc.n}`, () => {
      const ids = Array.from({ length: tc.n })
        .fill()
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

test("suffix length is between 26-28 characters long", () => {
  for (let index = 0; index < 100_000; index++) {
    vi.setSystemTime(new Date(randomInt(281_474_976_710_655)));

    const suffix = newId("donation").split("_")[1];
    expect(suffix.length).toBeGreaterThanOrEqual(26);
    expect(suffix.length).toBeLessThanOrEqual(28);
  }
});
