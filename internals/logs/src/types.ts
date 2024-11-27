import type { z } from "zod";
import type { logSchema } from "./logs";

export type LogSchema = z.infer<typeof logSchema>;
