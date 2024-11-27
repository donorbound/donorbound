import type { Context } from "hono";
import type { ZodError, z } from "zod";

import { HTTPException } from "hono/http-exception";

import type { HonoContext } from "~/pkgs/hono/context";

import { parseZodErrorMessage } from "~/pkgs/utils/zod-error";

import type { ErrorCode } from "./error-codes";
import type { ErrorResponse } from "./error-schema";

import { DonorboundApiError } from "./donorbound-api-error";
import { codeToStatus, statusToCode } from "./utils";

/**
 * Handles a Zod validation error and returns an error response.
 */
export function handleZodError<T>(
  result:
    | {
        success: true;
        data: T;
      }
    | {
        success: false;
        error: ZodError;
      },
  c: Context,
) {
  if (!result.success) {
    return c.json<ErrorResponse>(
      {
        error: {
          code: "BAD_REQUEST",
          docs: "https://donorbound.com/docs/api-reference/errors/code/BAD_REQUEST",
          message: parseZodErrorMessage(result.error),
          requestId: c.get("requestId"),
        },
      },
      { status: 400 },
    );
  }
  return c.json({ data: result.data });
}

/**
 * Handles an error and returns an appropriate error response.
 */
export function handleError(error: Error, c: Context<HonoContext>): Response {
  const { logger } = c.get("services");

  if (error instanceof DonorboundApiError) {
    if (error.status >= 500) {
      logger.error("returning 5XX", {
        code: error.code,
        message: error.message,
        name: error.name,
        status: error.status,
      });
    }
    return c.json<ErrorResponse>(
      {
        error: {
          code: error.code,
          docs: `https://donorbound.com/docs/api-reference/errors/code/${error.code}`,
          message: error.message,
          requestId: c.get("requestId"),
        },
      },
      { status: error.status },
    );
  }

  if (error instanceof HTTPException) {
    if (error.status >= 500) {
      logger.error("HTTPException", {
        message: error.message,
        requestId: c.get("requestId"),
        status: error.status,
      });
    }
    const code = statusToCode(error.status);
    return c.json<ErrorResponse>(
      {
        error: {
          code,
          docs: `https://donorbound.com/docs/api-reference/errors/code/${code}`,
          message: error.message,
          requestId: c.get("requestId"),
        },
      },
      { status: error.status },
    );
  }

  logger.error("unhandled exception", {
    cause: error.cause,
    message: error.message,
    name: error.name,
    requestId: c.get("requestId"),
    stack: error.stack,
  });
  return c.json<ErrorResponse>(
    {
      error: {
        code: "INTERNAL_SERVER_ERROR",
        docs: "https://donorbound.com/docs/api-reference/errors/code/INTERNAL_SERVER_ERROR",
        message: error.message ?? "something unexpected happened",
        requestId: c.get("requestId"),
      },
    },
    { status: 500 },
  );
}

/**
 * Returns an error response with a specified code and message.
 */
export function errorResponse(
  c: Context,
  code: z.infer<typeof ErrorCode>,
  message: string,
) {
  return c.json<ErrorResponse>(
    {
      error: {
        code: code,
        docs: `https://donorbound.com/docs/api-reference/errors/code/${code}`,
        message,
        requestId: c.get("requestId"),
      },
    },
    { status: codeToStatus(code) },
  );
}
