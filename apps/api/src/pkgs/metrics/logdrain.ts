import { Log } from "@donorbound/logs";
import type { LogSchema } from "@donorbound/logs/types";
import type { Metric } from "@donorbound/metrics";
import type { Metrics } from "./interface";

/**
 * Class implementing the Metrics interface to log metric events.
 */
export class LogdrainMetrics implements Metrics {
  private readonly requestId: string;
  private readonly isolateId: string | undefined;
  private readonly environment: LogSchema["environment"];

  /**
   * Creates an instance of LogdrainMetrics.
   * @param {Object} options - Options for the LogdrainMetrics.
   * @param {string} options.requestId - The request ID.
   * @param {string | undefined} options.isolateId - The isolate ID.
   * @param {LogSchema["environment"]} options.environment - The environment.
   */
  constructor(options: {
    requestId: string;
    isolateId: string | undefined;
    environment: LogSchema["environment"];
  }) {
    this.requestId = options.requestId;
    this.isolateId = options.isolateId;
    this.environment = options.environment;
  }

  /**
   * Emits a new metric event by logging it.
   * @param {Metric} metric - The metric event to be logged.
   */
  public emit(metric: Metric): void {
    const log = new Log({
      requestId: this.requestId,
      isolateId: this.isolateId,
      environment: this.environment,
      application: "api",
      type: "metric",
      time: Date.now(),
      metric,
    });

    console.info(log.toString());
  }

  /**
   * Persists all metrics to durable storage.
   * Currently, this method does nothing.
   * @returns {Promise<void>} A promise that resolves when the operation is complete.
   */
  public async flush(): Promise<void> {
    return;
  }
}
