import { ConsoleLogger } from "@donorbound/worker-logging";

import { type Environment, zEnvironment } from "~/pkgs/environment";
import { createHonoApp } from "~/pkgs/hono/create-hono-app";

import { registerV1Liveness } from "./routes/v1-liveness";

/**
 * The Hono app
 */
const app = createHonoApp();

/**
 * Registering all route handlers
 */
registerV1Liveness(app);

/**
 * The worker handler
 *
 * This object serves as the entry point for the application, handling all incoming requests.
 * It validates the environment configuration and delegates request processing to the Hono app.
 *
 * @type {Object}
 * @property {Function} fetch - Handles incoming requests and returns a response.
 */
const handler = {
  /**
   * Handles incoming requests and returns a response.
   *
   * This method is the main entry point for processing HTTP requests. It ensures that the
   * environment variables are correctly configured before passing the request to the Hono app.
   *
   * @param {Request} request - The incoming request object.
   * @param {Environment} environment - The environment variables.
   * @param {ExecutionContext} executionContext - The execution context.
   * @returns {Promise<Response>} The response to the request.
   */
  fetch: (
    request: Request,
    environment: Environment,
    executionContext: ExecutionContext,
  ) => {
    const parsedEnvironment = zEnvironment.safeParse(environment);
    if (!parsedEnvironment.success) {
      new ConsoleLogger({
        application: "api",
        environment: environment.ENVIRONMENT,
        requestId: "",
      }).fatal(`BAD_ENVIRONMENT: ${parsedEnvironment.error.message}`);
      return Response.json(
        {
          code: "BAD_ENVIRONMENT",
          errors: parsedEnvironment.error,
          message: "Some environment variables are missing or are invalid",
        },
        { status: 500 },
      );
    }

    return app.fetch(request, parsedEnvironment.data, executionContext);
  },
};

export default handler;
