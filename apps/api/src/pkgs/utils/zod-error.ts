import type { z } from "zod";

export function parseZodErrorMessage(err: z.ZodError): string {
  try {
    const arr = JSON.parse(err.message) as Array<{
      message: string;
      path: Array<string>;
    }>;
    if (arr[0]) {
      const { path, message } = arr[0];
      return `${path.join(".")}: ${message}`;
    }
    return err.message;
  } catch {
    return err.message;
  }
}
