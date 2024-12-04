import "dotenv/config";
import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dbCredentials: {
    url: "postgres://postgres@localhost:5432/donorbound",
  },
  dialect: "postgresql",
  out: "./drizzle",
  schema: "./src/schemas/index.ts",
});
