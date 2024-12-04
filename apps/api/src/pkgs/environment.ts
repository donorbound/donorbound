import { z } from "zod";

/**
 * Zod schema for validating environment variables.
 */
export const zEnvironment = z.object({
  AXIOM_TOKEN: z.string().optional(),
  DATABASE_URL: z.string(),
  DATABASE_URL_READONLY: z.string().optional(),
  EMIT_METRICS_LOGS: z
    .string()
    .optional()
    .default("true")
    .transform((v) => {
      return v === "true";
    }),
  ENVIRONMENT: z
    .enum(["development", "preview", "canary", "production"])
    .default("development"),
  VERSION: z.string().default("unknown"),
});

/**
 * Type representing the validated environment variables.
 * @typedef {z.infer<typeof zEnvironment>} Environment
 */
export type Environment = z.infer<typeof zEnvironment>;
