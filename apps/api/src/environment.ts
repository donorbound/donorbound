import { config } from "dotenv";
import { expand } from "dotenv-expand";
import path from "node:path";
import { z } from "zod";

expand(
  config({
    path: path.resolve(
      process.cwd(),
      // biome-ignore lint/complexity/useLiteralKeys: <explanation>
      process.env["NODE_ENV"] === "test" ? ".env.test" : ".env",
    ),
  }),
);

const EnvironmentSchema = z
  .object({
    DATABASE_AUTH_TOKEN: z.string().optional(),
    DATABASE_URL: z.string().url(),
    LOG_LEVEL: z.enum([
      "fatal",
      "error",
      "warn",
      "info",
      "debug",
      "trace",
      "silent",
    ]),
    NODE_ENV: z.string().default("development"),
    PORT: z.coerce.number().default(9999),
  })
  .superRefine((input, context) => {
    if (input.NODE_ENV === "production" && !input.DATABASE_AUTH_TOKEN) {
      context.addIssue({
        code: z.ZodIssueCode.invalid_type,
        expected: "string",
        message: "Must be set when NODE_ENV is 'production'",
        path: ["DATABASE_AUTH_TOKEN"],
        received: "undefined",
      });
    }
  });

export type environment = z.infer<typeof EnvironmentSchema>;

const { data: environment, error } = EnvironmentSchema.safeParse(process.env);

if (error) {
  console.error("❌ Invalid env:");
  console.error(JSON.stringify(error.flatten().fieldErrors, undefined, 2));

  throw new Error("Invalid environment variables");
}

export default environment;
