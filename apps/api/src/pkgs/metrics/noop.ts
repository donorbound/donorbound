/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Metric } from "@donorbound/metrics";

import type { Metrics } from "./interface";

/**
 * A no-operation implementation of the Metrics interface.
 * This class is used when metrics collection is not required.
 */
export class NoopMetrics implements Metrics {
  /**
   * A no-operation method for emitting a metric event.
   * @param {Metric} _metric - The metric event to be emitted (unused).
   * @returns {Promise<void>} A promise that resolves immediately.
   */
  public emit(_metric: Metric): Promise<void> {
    return Promise.resolve();
  }

  /**
   * A no-operation method for persisting metrics.
   * @returns {Promise<void>} A promise that resolves immediately.
   */
  public async flush(): Promise<void> {}
}
