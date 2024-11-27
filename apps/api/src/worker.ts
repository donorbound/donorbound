import { type Environment, zEnvironment } from "~/pkgs/environment";
import { newApp } from "~/pkgs/hono/app";

import { ConsoleLogger } from "@donorbound/worker-logging";
import { cors } from "hono/cors";
import { init } from "./pkgs/middlewares/analytics";
import { metrics } from "./pkgs/middlewares/metrics";

// routers
import { registerV1Liveness } from "./routes/v1-liveness";

/**
 * The Hono app
 */
const app = newApp();
app.use("*", init());
app.use("*", cors());
app.use("*", metrics());

/**
 * Registering all route handlers
 */

registerV1Liveness(app);

/**
 * The worker handler
 */
const handler = {
  fetch: (
    request: Request,
    environment: Environment,
    executionContext: ExecutionContext,
  ) => {
    const parsedEnvironment = zEnvironment.safeParse(environment);
    if (!parsedEnvironment.success) {
      new ConsoleLogger({
        requestId: "",
        environment: environment.ENVIRONMENT,
        application: "api",
      }).fatal(`BAD_ENVIRONMENT: ${parsedEnvironment.error.message}`);
      return Response.json(
        {
          code: "BAD_ENVIRONMENT",
          message: "Some environment variables are missing or are invalid",
          errors: parsedEnvironment.error,
        },
        { status: 500 },
      );
    }

    return app.fetch(request, parsedEnvironment.data, executionContext);
  },
};

export default handler;
