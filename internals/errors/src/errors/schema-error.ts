import type { ZodError } from "zod";
import { BaseError } from "./base";

/**
 * An object does not have the required schema.
 */
export class SchemaError extends BaseError<{ raw: unknown }> {
  public readonly retry = false;
  public readonly name = SchemaError.name;

  constructor(options: {
    message: string;
    context?: { raw: unknown };
    cause?: BaseError;
  }) {
    super({
      ...options,
    });
  }
  static fromZod<T>(
    error: ZodError<T>,
    raw: unknown,
    context?: Record<string, unknown>,
  ): SchemaError {
    return new SchemaError({
      message: error.message,
      context: {
        raw: JSON.stringify(raw),
        ...context,
      },
    });
  }
}
