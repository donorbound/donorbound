import { z } from "zod";

/**
 * Custom Zod schema for validating a Cloudflare ratelimiter object.
 */
export const cloudflareRatelimiter = z.custom<{
  limit: (options: { key: string }) => Promise<{ success: boolean }>;
}>((r) => !!r && typeof r.limit === "function");

/**
 * Zod schema for validating environment variables.
 */
export const zEnvironment = z.object({
  AXIOM_TOKEN: z.string().optional(),
  CLOUDFLARE_API_KEY: z.string().optional(),
  CLOUDFLARE_ZONE_ID: z.string().optional(),
  DATABASE_HOST: z.string(),
  DATABASE_HOST_READONLY: z.string().optional(),
  DATABASE_NAME: z.string().default("donorbound"),
  DATABASE_PASSWORD: z.string(),
  DATABASE_PASSWORD_READONLY: z.string().optional(),
  DATABASE_USERNAME: z.string(),
  DATABASE_USERNAME_READONLY: z.string().optional(),
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
