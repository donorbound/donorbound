import type { BaseError } from "./errors/base";

type OkResult<V> = {
  val: V;
  err?: never;
};

type ErrorResult<E extends BaseError> = {
  val?: never;
  err: E;
};

export type Result<V, E extends BaseError = BaseError> =
  | OkResult<V>
  | ErrorResult<E>;

export function Ok(): OkResult<never>;
export function Ok<V>(value: V): OkResult<V>;
export function Ok<V>(value?: V): OkResult<V> {
  return { val: value } as OkResult<V>;
}

export function _Error<E extends BaseError>(error: E): ErrorResult<E> {
  return { err: error };
}

/**
 * wrap catches thrown errors and returns a `Result`
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
