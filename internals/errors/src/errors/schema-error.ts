import type { ZodError } from "zod";

import { BaseError } from "./base";

/**
 * Represents an error when an object does not conform to the required schema.
 * @extends {BaseError<{ raw: unknown }>}
 */
export class SchemaError extends BaseError<{ raw: unknown }> {
  /**
   * Indicates whether the operation can be retried.
   * @type {boolean}
   * @readonly
   */
  public readonly retry = false;

  /**
   * The name of the error.
   * @type {string}
   * @readonly
   */
  public readonly name = SchemaError.name;

  /**
   * Creates an instance of SchemaError.
   * @param {Object} options - Options for the error.
   * @param {string} options.message - The error message.
   * @param {{ raw: unknown }} [options.context] - The context of the error.
   * @param {BaseError} [options.cause] - The cause of the error.
   */
  constructor(options: {
    message: string;
    context?: { raw: unknown };
    cause?: BaseError;
  }) {
    super({
      ...options,
    });
  }

  /**
   * Creates a SchemaError from a ZodError.
   * @template T
   * @param {ZodError<T>} error - The ZodError instance.
   * @param {unknown} raw - The raw data that caused the error.
   * @param {Record<string, unknown>} [context] - Additional context for the error.
   * @returns {SchemaError} A new SchemaError instance.
   */
  static fromZod<T>(
    error: ZodError<T>,
    raw: unknown,
    context?: Record<string, unknown>,
  ): SchemaError {
    return new SchemaError({
      context: {
        raw: JSON.stringify(raw),
        ...context,
      },
      message: error.message,
    });
  }
}
