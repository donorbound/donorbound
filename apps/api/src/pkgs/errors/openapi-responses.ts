import { z } from "zod";

import { errorSchemaFactory } from "./error-schema";

export const openApiErrorResponses = {
  400: {
    content: {
      "application/json": {
        schema: errorSchemaFactory(z.enum(["BAD_REQUEST"])).openapi(
          "ErrBadRequest",
        ),
      },
    },
    description:
      "The server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).",
  },
  401: {
    content: {
      "application/json": {
        schema: errorSchemaFactory(z.enum(["UNAUTHORIZED"])).openapi(
          "ErrUnauthorized",
        ),
      },
    },
    description: `Although the HTTP standard specifies "unauthorized", semantically this response means "unauthenticated". That is, the client must authenticate itself to get the requested response.`,
  },
  403: {
    content: {
      "application/json": {
        schema: errorSchemaFactory(z.enum(["FORBIDDEN"])).openapi(
          "ErrForbidden",
        ),
      },
    },
    description:
      "The client does not have access rights to the content; that is, it is unauthorized, so the server is refusing to give the requested resource. Unlike 401 Unauthorized, the client's identity is known to the server.",
  },
  404: {
    content: {
      "application/json": {
        schema: errorSchemaFactory(z.enum(["NOT_FOUND"])).openapi(
          "ErrNotFound",
        ),
      },
    },
    description:
      "The server cannot find the requested resource. In the browser, this means the URL is not recognized. In an API, this can also mean that the endpoint is valid but the resource itself does not exist. Servers may also send this response instead of 403 Forbidden to hide the existence of a resource from an unauthorized client. This response code is probably the most well known due to its frequent occurrence on the web.",
  },
  409: {
    content: {
      "application/json": {
        schema: errorSchemaFactory(z.enum(["CONFLICT"])).openapi("ErrConflict"),
      },
    },
    description:
      "This response is sent when a request conflicts with the current state of the server.",
  },
  429: {
    content: {
      "application/json": {
        schema: errorSchemaFactory(z.enum(["TOO_MANY_REQUESTS"])).openapi(
          "ErrTooManyRequests",
        ),
      },
    },
    description: `The user has sent too many requests in a given amount of time ("rate limiting")`,
  },
  500: {
    content: {
      "application/json": {
        schema: errorSchemaFactory(z.enum(["INTERNAL_SERVER_ERROR"])).openapi(
          "ErrInternalServerError",
        ),
      },
    },
    description:
      "The server has encountered a situation it does not know how to handle.",
  },
};
