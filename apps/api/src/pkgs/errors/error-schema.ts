import { z } from "@hono/zod-openapi";
import { ErrorCode } from "./error-codes";

/**
 * Factory function to create an error schema.
 */
export function errorSchemaFactory(code: z.ZodEnum<[string, ...string[]]>) {
  return z.object({
    error: z.object({
      code: code.openapi({
        description: "A machine readable error code.",
        example: code._def.values.at(0) as (typeof code._def.values)[number],
      }),
      docs: z.string().openapi({
        description:
          "A link to our documentation with more details about this error code",
        example: `https://donorbound.com/docs/api-reference/errors/code/${code._def.values.at(0)}`,
      }),
      message: z.string().openapi({
        description: "A human readable explanation of what went wrong",
      }),
      requestId: z.string().openapi({
        description: "Please always include the requestId in your error report",
        example: "req_1234",
      }),
    }),
  });
}

/**
 * Schema for error responses.
 */
export const ErrorSchema = z.object({
  error: z.object({
    code: ErrorCode.openapi({
      description: "A machine readable error code.",
      example: "INTERNAL_SERVER_ERROR",
    }),
    docs: z.string().openapi({
      description:
        "A link to our documentation with more details about this error code",
      example:
        "https://donorbound.com/docs/api-reference/errors/code/BAD_REQUEST",
    }),
    message: z.string().openapi({
      description: "A human readable explanation of what went wrong",
    }),
    requestId: z.string().openapi({
      description: "Please always include the requestId in your error report",
      example: "req_1234",
    }),
  }),
});

export type ErrorResponse = z.infer<typeof ErrorSchema>;
