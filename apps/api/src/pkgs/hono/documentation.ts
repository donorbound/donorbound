import type { OpenAPIHono } from "@hono/zod-openapi";

import { apiReference } from "@scalar/hono-api-reference";

import type { HonoContext } from "./context";

/**
 * Sets up OpenAPI documentation for the app.
 * @param {OpenAPIHono} app - The app instance.
 */
export function setupDocumentation(app: OpenAPIHono<HonoContext>) {
  app.doc("/openapi.json", {
    info: {
      title: "Donorbound API",
      version: "1.0.0",
    },
    openapi: "3.0.0",
    servers: [
      {
        description: "Production",
        url: "https://api.donorbound.com",
      },
      {
        description: "Development",
        url: "http://localhost:7878",
      },
    ],
    "x-speakeasy-retries": {
      backoff: {
        exponent: 1.5,
        initialInterval: 50, // 50ms
        maxElapsedTime: 30_000, // 30s
        maxInterval: 1000, // 1s
      },
      retryConnectionErrors: true,
      statusCodes: ["5XX"],
      strategy: "backoff",
    },
  });

  app.openAPIRegistry.registerComponent("securitySchemes", "bearerAuth", {
    bearerFormat: "root key",
    scheme: "bearer",
    type: "http",
    "x-speakeasy-example": "DONORBOUND_ROOT_KEY",
  });

  app.get(
    "/reference",
    apiReference({
      spec: {
        url: "/openapi.json",
      },
      theme: "bluePlanet",
    }),
  );
}
