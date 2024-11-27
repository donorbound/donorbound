import type { OpenAPIHono } from "@hono/zod-openapi";

import { cors } from "hono/cors";

import type { HonoContext } from "./context";

import { init } from "../middlewares/analytics";
import { metrics } from "../middlewares/metrics";

/**
 * Applies middlewares to the app.
 * @param {OpenAPIHono} app - The app instance.
 */
export function applyMiddlewares(app: OpenAPIHono<HonoContext>) {
  app.use("*", (c, next) => {
    c.set(
      "location",
      (
        c.req.header("True-Client-IP") ??
        c.req.header("CF-Connecting-IP") ??
        c.req.raw?.cf?.colo ??
        "unknown"
      ).toString(),
    );
    c.set("userAgent", c.req.header("User-Agent"));

    return next();
  });

  app.use("*", init());
  app.use("*", cors());
  app.use("*", metrics());
}
