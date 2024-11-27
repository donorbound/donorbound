import { createRoute, z } from "@hono/zod-openapi";
import { openApiErrorResponses } from "~/pkgs/errors/openapi-responses";

import type { App } from "~/pkgs/hono/app";

const route = createRoute({
  tags: ["liveness"],
  operationId: "v1.liveness",
  method: "get",
  path: "/v1/liveness",
  responses: {
    200: {
      description: "The configured services and their status",
      content: {
        "application/json": {
          schema: z.object({
            status: z.string().openapi({
              description: "The status of the server",
            }),
            services: z.object({
              metrics: z.string().openapi({
                description: "The name of the connected metrics service",
                example: "AxiomMetrics",
              }),
              logger: z.string().openapi({
                description: "The name of the connected logger service",
                example: "AxiomLogger or ConsoleLogger",
              }),
            }),
          }),
        },
      },
    },
    ...openApiErrorResponses,
  },
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
    const { logger, metrics } = c.get("services");

    return c.json(
      {
        status: "we're so back",
        services: {
          metrics: metrics.constructor.name,
          logger: logger.constructor.name,
        },
      },
      200,
    );
  });
