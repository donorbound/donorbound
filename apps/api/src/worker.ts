import { type Env, zEnv } from "~/pkgs/env";
import { newApp } from "~/pkgs/hono/app";

import { ConsoleLogger } from "@donorbound/worker-logging";
import { cors } from "hono/cors";
import { init } from "./pkgs/middlewares/analytics";
import { metrics } from "./pkgs/middlewares/metrics";
import { registerV1Liveness } from "./routes/v1_liveness";

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
  fetch: (req: Request, env: Env, executionCtx: ExecutionContext) => {
    const parsedEnv = zEnv.safeParse(env);
    if (!parsedEnv.success) {
      new ConsoleLogger({
        requestId: "",
        environment: env.ENVIRONMENT,
        application: "api",
      }).fatal(`BAD_ENVIRONMENT: ${parsedEnv.error.message}`);
      return Response.json(
        {
          code: "BAD_ENVIRONMENT",
          message: "Some environment variables are missing or are invalid",
          errors: parsedEnv.error,
        },
        { status: 500 },
      );
    }

    return app.fetch(req, parsedEnv.data, executionCtx);
  },
};

export default handler;
