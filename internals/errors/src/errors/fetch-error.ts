import { BaseError } from "./base";

/**
 * Represents an error that occurs during a fetch operation.
 * @extends {BaseError<{ url: string; method: string; [more: string]: unknown }>}
 */
export class FetchError extends BaseError<{
  url: string;
  method: string;
  [more: string]: unknown;
}> {
  /**
   * Indicates whether the operation can be retried.
   * @type {boolean}
   * @readonly
   */
  public readonly retry: boolean;

  /**
   * The name of the error.
   * @type {string}
   * @readonly
   */
  public readonly name = FetchError.name;

  /**
   * Creates an instance of FetchError.
   * @param {Object} options - Options for the error.
   * @param {string} options.message - The error message.
   * @param {boolean} options.retry - Indicates if the operation can be retried.
   * @param {BaseError} [options.cause] - The cause of the error.
   * @param {{ url: string; method: string; [more: string]: unknown }} [options.context] - The context of the error.
   */
  constructor(options: {
    message: string;
    retry: boolean;
    cause?: BaseError;
    context?: {
      url: string;
      method: string;
      [more: string]: unknown;
    };
  }) {
    super(options);
    this.retry = options.retry;
  }
}
