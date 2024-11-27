import { OpenAPIHono } from "@hono/zod-openapi";
import { apiReference } from "@scalar/hono-api-reference";
import type { Context as GenericContext } from "hono";
import { prettyJSON } from "hono/pretty-json";
import { handleError, handleZodError } from "~/pkgs/errors/http";
import type { HonoEnv } from "./env";

export function newApp() {
  const app = new OpenAPIHono<HonoEnv>({
    defaultHook: handleZodError,
  });

  app.use(prettyJSON());
  app.onError(handleError);

  app.use("*", (c, next) => {
    c.set(
      "location",
      (
        c.req.header("True-Client-IP") ??
        c.req.header("CF-Connecting-IP") ??
        c.req.raw?.cf?.colo ??
        "unknown"
      ).toString(), // Ensure the value is a string
    );
    c.set("userAgent", c.req.header("User-Agent"));

    return next();
  });

  app.doc("/openapi.json", {
    openapi: "3.0.0",
    info: {
      title: "Donorbound API",
      version: "1.0.0",
    },

    servers: [
      {
        url: "https://api.donorbound.com",
        description: "Production",
      },
    ],

    "x-speakeasy-retries": {
      strategy: "backoff",
      backoff: {
        initialInterval: 50, // 50ms
        maxInterval: 1_000, // 1s
        maxElapsedTime: 30_000, // 30s
        exponent: 1.5,
      },
      statusCodes: ["5XX"],
      retryConnectionErrors: true,
    },
  });

  app.get(
    "/reference",
    apiReference({
      theme: "bluePlanet",
      spec: {
        url: "/openapi.json",
      },
    }),
  );

  app.openAPIRegistry.registerComponent("securitySchemes", "bearerAuth", {
    bearerFormat: "root key",
    type: "http",
    scheme: "bearer",
    "x-speakeasy-example": "DONORBOUND_ROOT_KEY",
  });
  return app;
}

export type App = ReturnType<typeof newApp>;
export type Context = GenericContext<HonoEnv>;
