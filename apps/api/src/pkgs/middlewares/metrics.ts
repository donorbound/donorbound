import type { Metric } from "@donorbound/metrics";
import type { MiddlewareHandler } from "hono";
import type { HonoContext } from "../hono/context";

type DiscriminateMetric<T, M = Metric> = M extends { metric: T } ? M : never;

/**
 * Middleware to collect and emit metrics for HTTP requests.
 * @returns {MiddlewareHandler<HonoContext>} The middleware handler function.
 */
export function metrics(): MiddlewareHandler<HonoContext> {
  return async (c, next) => {
    const { metrics } = c.get("services");

    const start = performance.now();
    const m = {
      isolateId: c.get("isolateId"),
      isolateLifetime: Date.now() - c.get("isolateCreatedAt"),
      metric: "metric.http.request",
      path: c.req.path,
      host: new URL(c.req.url).host,
      method: c.req.method,
      continent: c.req.raw?.cf?.continent,
      country: c.req.raw?.cf?.country,
      colo: c.req.raw?.cf?.colo,
      city: c.req.raw?.cf?.city,
      userAgent: c.req.header("user-agent"),
      fromAgent: c.req.header("Donorbound-Redirect"),
      context: {},
    } as DiscriminateMetric<"metric.http.request">;

    try {
      await next();
    } catch (error) {
      m.error = (error as Error).message;
      c.get("services").logger.error("request", {
        method: c.req.method,
        path: c.req.path,
        error: error,
      });
      throw error;
    } finally {
      m.status = c.res.status;
      m.context = c.get("metricsContext") ?? {};
      m.serviceLatency = performance.now() - start;
      c.res.headers.append(
        "Donorbound-Latency",
        `service=${m.serviceLatency}ms`,
      );
      c.res.headers.append("Donorbound-Version", c.env.VERSION);
      metrics.emit(m);
      c.executionCtx.waitUntil(metrics.flush());

      const responseHeaders: Array<string> = [];
      c.res.headers.forEach((v, k) => {
        responseHeaders.push(`${k}: ${v}`);
      });
    }
  };
}
