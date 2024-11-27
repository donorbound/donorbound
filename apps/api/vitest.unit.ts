import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    alias: {
      "~/": new URL("src/", import.meta.url).pathname,
    },
    exclude: ["./src/integration/**", "./src/routes/**", "./src/benchmarks/**"],
    include: ["./src/**/*.test.ts"],
    outputFile: "./.vitest/html",
    reporters: ["html", "verbose"],
  },
});
