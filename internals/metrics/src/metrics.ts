import { z } from "zod";

/**
 * Schema for different types of metrics, discriminated by the "metric" field.
 * @type {z.ZodUnion}
 */
export const metricSchema = z.discriminatedUnion("metric", [
  z.object({
    city: z.string().optional(),
    coldStart: z.boolean().optional(),
    error: z.string().optional(),
    host: z.string(),
    isolateId: z.string().optional(),
    method: z.string(),
    metric: z.literal("metric.http.request"),
    path: z.string(),
    status: z.number(),
    /**
     * Regional data might differ on non-Cloudflare deployments.
     * @type {string | undefined}
     */
    colo: z.string().optional(),
    context: z.record(z.unknown()),
    continent: z.string().optional(),
    country: z.string().optional(),
    fromAgent: z.string().optional(),
    /**
     * Milliseconds since the worker was initialized for the first time.
     * A non-zero value indicates the worker is reused.
     * @type {number | undefined}
     */
    isolateLifetime: z.number().optional(),
    serviceLatency: z.number(),
    userAgent: z.string().optional(),
  }),
  z.object({
    dbRes: z.string().optional(),
    latency: z.number(),
    metric: z.literal("metric.db.read"),
    query: z.enum([
      "getKeyAndApiByHash",
      "loadFromOrigin",
      "getKeysByKeyAuthId",
    ]),
    sql: z.string().optional(),
  }),
  z.object({
    attempts: z.number().optional(),
    latency: z.number(),
    metric: z.literal("metric.db.transaction"),
    name: z.string(),
    path: z.string().optional(),
  }),
]);

/**
 * Type representing the inferred schema of a metric.
 * @typedef {z.infer<typeof metricSchema>} Metric
 */
export type Metric = z.infer<typeof metricSchema>;
