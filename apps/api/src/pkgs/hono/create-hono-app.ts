import { OpenAPIHono } from "@hono/zod-openapi";
import { prettyJSON } from "hono/pretty-json";

import type { HonoContext } from "./context";

import { handleError, handleZodError } from "../errors/error-handlers";
import { setupDocumentation } from "./documentation";
import { applyMiddlewares } from "./middlewares";

/**
 * Initializes and configures a new OpenAPIHono application.
 * @returns {OpenAPIHono<HonoContext>} The configured Hono application instance.
 */
export function createHonoApp() {
  const app = new OpenAPIHono<HonoContext>({
    defaultHook: handleZodError,
  });

  app.use(prettyJSON());
  app.onError(handleError);

  applyMiddlewares(app);
  setupDocumentation(app);

  return app;
}

export type App = ReturnType<typeof createHonoApp>;
