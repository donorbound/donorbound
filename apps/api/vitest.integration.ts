import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    alias: {
      "~/": new URL("src/", import.meta.url).pathname,
    },
    include: ["./src/routes/**/*.test.ts", "./src/integration/**/*.test.ts"],
    outputFile: "./.vitest/html",
    pool: "threads",
    poolOptions: {
      threads: {
        singleThread: true,
      },
    },
    reporters: ["html", "verbose"],
    teardownTimeout: 60_000,
    testTimeout: 60_000,
  },
});
