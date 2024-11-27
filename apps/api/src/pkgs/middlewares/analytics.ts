import type { MiddlewareHandler } from "hono";

import { newId } from "@donorbound/id";
import { ConsoleLogger } from "@donorbound/worker-logging";

import type { HonoContext } from "../hono/context";
import type { Metrics } from "../metrics/interface";

import { LogdrainMetrics } from "../metrics/logdrain";
import { NoopMetrics } from "../metrics/noop";

/**
 * workerId and coldStartAt are used to track the lifetime of the worker
 * and are set once when the worker is first initialized.
 *
 * subsequent requests will use the same workerId and coldStartAt
 */
let isolateId: string | undefined;
let isolateCreatedAt: number | undefined;

/**
 * Initializes all services and sets up middleware for request handling.
 * This function should be called once before any Hono handlers run.
 * @returns {MiddlewareHandler<HonoContext>} The middleware handler function.
 */
export function init(): MiddlewareHandler<HonoContext> {
  return async (c, next) => {
    if (!isolateId) {
      isolateId = crypto.randomUUID();
    }
    if (!isolateCreatedAt) {
      isolateCreatedAt = Date.now();
    }
    c.set("isolateId", isolateId);
    c.set("isolateCreatedAt", isolateCreatedAt);
    const requestId = newId("request");
    c.set("requestId", requestId);

    c.set("requestStartedAt", Date.now());

    c.res.headers.set("Donorbound-Request-Id", requestId);

    const logger = new ConsoleLogger({
      application: "api",
      defaultFields: { environment: c.env.ENVIRONMENT },
      environment: c.env.ENVIRONMENT,
      requestId,
    });

    const metrics: Metrics = c.env.EMIT_METRICS_LOGS
      ? new LogdrainMetrics({
          environment: c.env.ENVIRONMENT,
          isolateId,
          requestId,
        })
      : new NoopMetrics();

    c.set("services", {
      logger,
      metrics,
    });

    await next();
  };
}
