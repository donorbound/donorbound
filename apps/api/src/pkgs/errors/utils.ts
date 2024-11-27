import type { z } from "@hono/zod-openapi";
import type { StatusCode } from "hono/utils/http-status";

import type { ErrorCode } from "./error-codes";

/**
 * Converts an error code to an HTTP status code.
 */
export function codeToStatus(code: z.infer<typeof ErrorCode>): StatusCode {
  switch (code) {
    case "BAD_REQUEST": {
      return 400;
    }
    case "FORBIDDEN":
    case "DISABLED":
    case "UNAUTHORIZED":
    case "INSUFFICIENT_PERMISSIONS":
    case "USAGE_EXCEEDED":
    case "EXPIRED": {
      return 403;
    }
    case "NOT_FOUND": {
      return 404;
    }
    case "METHOD_NOT_ALLOWED": {
      return 405;
    }
    case "NOT_UNIQUE": {
      return 409;
    }
    case "DELETE_PROTECTED":
    case "PRECONDITION_FAILED": {
      return 412;
    }
    case "RATE_LIMITED": {
      return 429;
    }
    case "INTERNAL_SERVER_ERROR": {
      return 500;
    }
  }
}

/**
 * Converts an HTTP status code to an error code.
 */
export function statusToCode(status: StatusCode): z.infer<typeof ErrorCode> {
  switch (status) {
    case 400: {
      return "BAD_REQUEST";
    }
    case 401: {
      return "UNAUTHORIZED";
    }
    case 403: {
      return "FORBIDDEN";
    }
    case 404: {
      return "NOT_FOUND";
    }
    case 405: {
      return "METHOD_NOT_ALLOWED";
    }
    case 500: {
      return "INTERNAL_SERVER_ERROR";
    }
    default: {
      return "INTERNAL_SERVER_ERROR";
    }
  }
}
