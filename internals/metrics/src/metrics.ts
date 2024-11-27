import { z } from "zod";

export const metricSchema = z.discriminatedUnion("metric", [
  z.object({
    metric: z.literal("metric.http.request"),
    host: z.string(),
    path: z.string(),
    method: z.string(),
    status: z.number(),
    // ms since worker initilized for the first time
    // a non zero value means the worker is reused
    isolateLifetime: z.number().optional(),
    isolateId: z.string().optional(),
    error: z.string().optional(),
    coldStart: z.boolean().optional(),
    serviceLatency: z.number(),
    // Regional data might be different on non-cloudflare deployments
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

export type Metric = z.infer<typeof metricSchema>;
