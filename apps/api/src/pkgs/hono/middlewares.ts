import type { OpenAPIHono } from "@hono/zod-openapi";

import { drizzle, schema } from "@donorbound/db";
import { cors } from "hono/cors";
import { HTTPException } from "hono/http-exception";

import environment from "~/environment";

import type { HonoContext } from "./context";

import { createAuthConnection } from "../auth";
import { init } from "../middlewares/init";
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
        "unknown"
      ).toString(),
    );
    c.set("userAgent", c.req.header("User-Agent"));

    return next();
  });

  app.use("*", init());
  app.use(
    "*",
    cors({
      allowHeaders: ["Content-Type", "Authorization"],
      allowMethods: ["POST", "GET", "OPTIONS"],
      credentials: true,
      exposeHeaders: ["Content-Length"],
      maxAge: 600,
      origin: ["http://localhost:3001", "http://localhost:9999"],
    }),
  );
  app.use("*", metrics());

  app.use(
    "/api/auth/**", // or replace with "*" to enable cors for all routes
    cors({
      allowHeaders: ["Content-Type", "Authorization"],
      allowMethods: ["POST", "GET", "OPTIONS"],
      credentials: true,
      exposeHeaders: ["Content-Length"],
      maxAge: 600,
      origin: ["http://localhost:3001", "http://localhost:9999"],
      // origin: (origin, _) => {
      //   if (allowedOrigins.includes(origin)) {
      //     return origin;
      //   }
      //   return;
      // },
    }),
  );

  app.on(["POST", "GET"], "/api/auth/**", async (c) => {
    // const { db } = c.get("services");
    console.log(environment?.DATABASE_URL);
    try {
      const database = drizzle(environment?.DATABASE_URL ?? "", {
        logger: true,
        schema,
      });
      const auth = createAuthConnection(database);
      // console.log("auth client");
      // console.log(auth);
      return await auth.handler(c.req.raw);
    } catch (error) {
      console.log(error);
      throw new HTTPException(401, { cause: error });
    }
  });
}
