import type { z } from "zod";

/**
 * Parses a ZodError to extract a human-readable error message.
 * @param {z.ZodError} error - The ZodError instance to parse.
 * @returns {string} A string representation of the first error message and its path.
 */
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
