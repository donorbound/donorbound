import { BaseError } from "./base";

/**
 * Represents an error indicating that an environment variable was not configured properly.
 * @extends {BaseError<{ name: string }>}
 */
export class EnvironmentError extends BaseError<{
  name: string;
}> {
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
  public readonly name = EnvironmentError.name;
}
