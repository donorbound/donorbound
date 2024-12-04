// import { Pool, schema, sql } from "@donorbound/db";
import { createRoute, z } from "@hono/zod-openapi";

// import pg from "pg";
import type { App } from "~/pkgs/hono/create-hono-app";

import { openApiErrorResponses } from "~/pkgs/errors/openapi-responses";

const route = createRoute({
  method: "get",
  operationId: "v1.liveness",
  path: "/v1/liveness",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.object({
            services: z.object({
              logger: z.string().openapi({
                description: "The name of the connected logger service",
                example: "AxiomLogger or ConsoleLogger",
              }),
              metrics: z.string().openapi({
                description: "The name of the connected metrics service",
                example: "AxiomMetrics",
              }),
            }),
            status: z.string().openapi({
              description: "The status of the server",
            }),
          }),
        },
      },
      description: "The configured services and their status",
    },
    ...openApiErrorResponses,
  },
  tags: ["liveness"],
});

/**
 * Type representing the response for the v1 liveness endpoint.
 * @typedef {z.infer<(typeof route.responses)[200]["content"]["application/json"]["schema"]>} V1LivenessResponse
 */
export type V1LivenessResponse = z.infer<
  (typeof route.responses)[200]["content"]["application/json"]["schema"]
>;

/**
 * Registers the v1 liveness route with the given app.
 *
 * This route provides the status of the server and the names of the connected services.
 *
 * @param {App} app - The Hono app instance to register the route with.
 */
export const registerV1Liveness = (app: App) =>
  app.openapi(route, async (c) => {
    const { db, logger, metrics } = c.get("services");

    return c.json(
      {
        services: {
          db: db.primary.constructor.name,
          logger: logger.constructor.name,
          metrics: metrics.constructor.name,
        },
        status: "we're so back",
      },
      200,
    );
  });
