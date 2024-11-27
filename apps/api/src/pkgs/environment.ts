import { z } from "zod";

export const cloudflareRatelimiter = z.custom<{
  limit: (options: { key: string }) => Promise<{ success: boolean }>;
}>((r) => !!r && typeof r.limit === "function");

export const zEnvironment = z.object({
  VERSION: z.string().default("unknown"),
  DATABASE_HOST: z.string(),
  DATABASE_USERNAME: z.string(),
  DATABASE_PASSWORD: z.string(),
  DATABASE_NAME: z.string().default("donorbound"),
  DATABASE_HOST_READONLY: z.string().optional(),
  DATABASE_USERNAME_READONLY: z.string().optional(),
  DATABASE_PASSWORD_READONLY: z.string().optional(),
  AXIOM_TOKEN: z.string().optional(),
  CLOUDFLARE_API_KEY: z.string().optional(),
  CLOUDFLARE_ZONE_ID: z.string().optional(),
  ENVIRONMENT: z
    .enum(["development", "preview", "canary", "production"])
    .default("development"),
  EMIT_METRICS_LOGS: z
    .string()
    .optional()
    .default("true")
    .transform((v) => {
      return v === "true";
    }),
});

export type Environment = z.infer<typeof zEnvironment>;
