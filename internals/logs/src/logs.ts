import { metricSchema } from "@donorbound/metrics";
import { z } from "zod";

import type { LogSchema } from "./types";

/**
 * Schema for log context.
 * @type {z.ZodObject}
 */
export const logContext = z.object({
  requestId: z.string(),
});

/**
 * Common fields for log entries.
 * @type {z.ZodObject}
 */
const commonFields = z.object({
  application: z.enum(["api"]),
  environment: z.enum([
    "test",
    "development",
    "preview",
    "canary",
    "production",
    "unknown",
  ]),
  isolateId: z.string().optional(),
  requestId: z.string(),
  time: z.number(),
});

/**
 * Schema for log entries, discriminated by type.
 * @type {z.ZodUnion}
 */
export const logSchema = z.discriminatedUnion("type", [
  commonFields.merge(
    z.object({
      context: z.record(z.any()),
      level: z.enum(["debug", "info", "warn", "error", "fatal"]),
      message: z.string(),
      type: z.literal("log"),
    }),
  ),
  commonFields.merge(
    z.object({
      metric: metricSchema,
      type: z.literal("metric"),
    }),
  ),
]);

/**
 * Class representing a log entry.
 * @template TLog
 * @param {TLog} log - The log entry.
 */
export class Log<TLog extends LogSchema = LogSchema> {
  /**
   * The log entry.
   * @type {TLog}
   */
  public readonly log: TLog;

  /**
   * Creates a new log entry.
   * @param {TLog} log - The log entry.
   */
  constructor(log: TLog) {
    this.log = log;
  }

  /**
   * Converts the log entry to a JSON string.
   * @returns {string} The JSON string representation of the log.
   */
  public toString(): string {
    return JSON.stringify(this.log);
  }
}
