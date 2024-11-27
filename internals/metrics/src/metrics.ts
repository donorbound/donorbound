import { z } from "zod";

/**
 * Schema for different types of metrics, discriminated by the "metric" field.
 * @type {z.ZodUnion}
 */
export const metricSchema = z.discriminatedUnion("metric", [
  z.object({
    metric: z.literal("metric.http.request"),
    host: z.string(),
    path: z.string(),
    method: z.string(),
    status: z.number(),
    /**
     * Milliseconds since the worker was initialized for the first time.
     * A non-zero value indicates the worker is reused.
     * @type {number | undefined}
     */
    isolateLifetime: z.number().optional(),
    isolateId: z.string().optional(),
    error: z.string().optional(),
    coldStart: z.boolean().optional(),
    serviceLatency: z.number(),
    /**
     * Regional data might differ on non-Cloudflare deployments.
     * @type {string | undefined}
     */
    colo: z.string().optional(),
    continent: z.string().optional(),
    country: z.string().optional(),
    city: z.string().optional(),
    userAgent: z.string().optional(),
    fromAgent: z.string().optional(),
    context: z.record(z.unknown()),
  }),
  z.object({
    metric: z.literal("metric.db.read"),
    query: z.enum([
      "getKeyAndApiByHash",
      "loadFromOrigin",
      "getKeysByKeyAuthId",
    ]),
    latency: z.number(),
    dbRes: z.string().optional(),
    sql: z.string().optional(),
  }),
  z.object({
    metric: z.literal("metric.db.transaction"),
    name: z.string(),
    path: z.string().optional(),
    latency: z.number(),
    attempts: z.number().optional(),
  }),
]);

/**
 * Type representing the inferred schema of a metric.
 * @typedef {z.infer<typeof metricSchema>} Metric
 */
export type Metric = z.infer<typeof metricSchema>;
