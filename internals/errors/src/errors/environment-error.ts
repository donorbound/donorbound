import { BaseError } from "./base";

/**
 * Environment Errors indicate an environment variable was not configured properly
 */
export class EnvironmentError extends BaseError<{
  name: string;
}> {
  public readonly retry = false;
  public readonly name = EnvironmentError.name;
}
