import type { z } from "zod";
import type { logSchema } from "./logs";

/**
 * Type representing the inferred schema of a log entry.
 * @typedef {z.infer<typeof logSchema>} LogSchema
 */
export type LogSchema = z.infer<typeof logSchema>;
