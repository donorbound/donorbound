import type { Logger } from "@donorbound/worker-logging/types";

import type { Environment } from "~/pkgs/environment";

import type { Metrics } from "../metrics/interface";
// import type { Database } from "../db";

/**
 * Represents the context for services used in the application.
 * @typedef {Object} ServiceContext
 * @property {Metrics} metrics - The metrics service.
 * @property {Logger} logger - The logger service.
 * // @property {{ primary: Database; readonly: Database }} [db] - The database service (commented out).
 */
export type ServiceContext = {
  metrics: Metrics;
  // db: { primary: Database; readonly: Database };
  logger: Logger;
};

/**
 * Represents the context for a Hono application.
 * @typedef {Object} HonoContext
 * @property {Environment} Bindings - The environment bindings.
 * @property {Object} Variables - The variables used in the context.
 * @property {string} Variables.isolateId - The ID of the isolate.
 * @property {number} Variables.isolateCreatedAt - The creation timestamp of the isolate.
 * @property {string} Variables.requestId - The ID of the request.
 * @property {number} Variables.requestStartedAt - The timestamp when the request started.
 * @property {string} [Variables.workspaceId] - The ID of the workspace (optional).
 * @property {Object} Variables.metricsContext - The context for metrics.
 * @property {string} [Variables.metricsContext.keyId] - The key ID for metrics (optional).
 * @property {unknown} [Variables.metricsContext[key: string]] - Additional metrics context.
 * @property {ServiceContext} Variables.services - The services context.
 * @property {string} Variables.location - IP address or region information.
 * @property {string} [Variables.userAgent] - The user agent string (optional).
 */
export type HonoContext = {
  Bindings: Environment;
  Variables: {
    isolateId: string;
    isolateCreatedAt: number;
    requestId: string;
    requestStartedAt: number;
    workspaceId?: string;
    metricsContext: {
      keyId?: string;
      [key: string]: unknown;
    };
    services: ServiceContext;
    /**
     * IP address or region information
     */
    location: string;
    userAgent?: string;
  };
};
