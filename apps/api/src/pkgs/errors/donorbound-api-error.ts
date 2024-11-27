import type { z } from "@hono/zod-openapi";

import { HTTPException } from "hono/http-exception";

import type { ErrorCode } from "./error-codes";

import { codeToStatus } from "./utils";

/**
 * Custom error class for Donorbound API errors.
 */
export class DonorboundApiError extends HTTPException {
  public readonly code: z.infer<typeof ErrorCode>;

  constructor({
    code,
    message,
  }: {
    code: z.infer<typeof ErrorCode>;
    message: string;
  }) {
    super(codeToStatus(code), { message });
    this.code = code;
  }
}
