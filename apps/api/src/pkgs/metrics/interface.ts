import type { Metric } from "@donorbound/metrics";

/**
 * Interface representing a metrics service.
 */
export interface Metrics {
  /**
   * Stores a new metric event.
   * @param {Metric} metric - The metric event to be stored.
   */
  emit(metric: Metric): void;

  /**
   * Persists all metrics to durable storage.
   * @returns {Promise<void>} A promise that resolves when the operation is complete.
   */
  flush(): Promise<void>;
}
