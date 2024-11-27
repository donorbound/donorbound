import type { z } from "zod";

export function parseZodErrorMessage(error: z.ZodError): string {
  try {
    const array = JSON.parse(error.message) as Array<{
      message: string;
      path: Array<string>;
    }>;
    if (array[0]) {
      const { path, message } = array[0];
      return `${path.join(".")}: ${message}`;
    }
    return error.message;
  } catch {
    return error.message;
  }
}
