import type { Logger } from "@donorbound/worker-logging/types";
import type { Env } from "~/pkgs/env";
import type { Metrics } from "../metrics/interface";
// import type { Database } from "../db";

export type ServiceContext = {
  metrics: Metrics;
  // db: { primary: Database; readonly: Database };
  logger: Logger;
};

export type HonoEnv = {
  Bindings: Env;
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
