import type { BaseError } from "./errors/base";

/**
 * Represents a successful result.
 * @template V
 * @typedef {Object} OkResult
 * @property {V} val - The value of the successful result.
 * @property {never} [err] - Error is never present in a successful result.
 */
type OkResult<V> = {
  val: V;
  err?: never;
};

/**
 * Represents an error result.
 * @template E
 * @typedef {Object} ErrorResult
 * @property {never} [val] - Value is never present in an error result.
 * @property {E} err - The error of the result.
 */
type ErrorResult<E extends BaseError> = {
  val?: never;
  err: E;
};

/**
 * Represents a result that can be either a success or an error.
 * @template V, E
 * @typedef {OkResult<V> | ErrorResult<E>} Result
 */
export type Result<V, E extends BaseError = BaseError> =
  | OkResult<V>
  | ErrorResult<E>;

/**
 * Creates a successful result.
 * @template V
 * @param {V} [value] - The value of the successful result.
 * @returns {OkResult<V>} The successful result.
 */
export function Ok(): OkResult<never>;
export function Ok<V>(value: V): OkResult<V>;
export function Ok<V>(value?: V): OkResult<V> {
  return { val: value } as OkResult<V>;
}

/**
 * Creates an error result.
 * @template E
 * @param {E} error - The error to be wrapped in the result.
 * @returns {ErrorResult<E>} The error result.
 */
export function _Error<E extends BaseError>(error: E): ErrorResult<E> {
  return { err: error };
}

/**
 * Wraps a promise to catch errors and return a `Result`.
 * @template T, E
 * @param {Promise<T>} p - The promise to wrap.
 * @param {(error: Error) => E} errorFactory - A function to create an error from a caught exception.
 * @returns {Promise<Result<T, E>>} A promise that resolves to a `Result`.
 */
export async function wrap<T, E extends BaseError>(
  p: Promise<T>,
  errorFactory: (error: Error) => E,
): Promise<Result<T, E>> {
  try {
    return Ok(await p);
  } catch (error) {
    return _Error(errorFactory(error as Error));
  }
}
