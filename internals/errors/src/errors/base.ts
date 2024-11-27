/**
 * Represents the context of an error as a record of key-value pairs.
 * @typedef {Record<string, unknown>} ErrorContext
 */
export type ErrorContext = Record<string, unknown>;

/**
 * Abstract base class for custom errors with additional context and cause.
 * @template TContext
 * @extends {Error}
 */
export abstract class BaseError<
  TContext extends ErrorContext = ErrorContext,
> extends Error {
  /**
   * Indicates whether the operation can be retried.
   * @type {boolean}
   * @abstract
   * @readonly
   */
  public abstract readonly retry: boolean;

  /**
   * The underlying cause of the error, if any.
   * @type {BaseError | undefined}
   * @readonly
   */
  public readonly cause: BaseError | undefined;

  /**
   * The context of the error, providing additional information.
   * @type {TContext | undefined}
   * @readonly
   */
  public readonly context: TContext | undefined;

  /**
   * The name of the error.
   * @type {string}
   * @abstract
   * @readonly
   */
  public abstract readonly name: string;

  /**
   * Creates an instance of BaseError.
   * @param {Object} options - Options for the error.
   * @param {string} options.message - The error message.
   * @param {BaseError} [options.cause] - The cause of the error.
   * @param {TContext} [options.context] - The context of the error.
   */
  constructor(options: {
    message: string;
    cause?: BaseError;
    context?: TContext;
  }) {
    super(options.message);
    this.cause = options.cause;
    this.context = options.context;
  }

  /**
   * Converts the error to a string representation.
   * @returns {string} The string representation of the error.
   */
  public toString(): string {
    return `${this.name}: ${this.message} - ${JSON.stringify(
      this.context,
    )} - caused by ${this.cause?.toString()}`;
  }
}
