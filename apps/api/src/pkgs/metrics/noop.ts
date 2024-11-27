import type { Metric } from "@donorbound/metrics";
import type { Metrics } from "./interface";

export class NoopMetrics implements Metrics {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public emit(_metric: Metric): Promise<void> {
    return Promise.resolve();
  }

  public async flush(): Promise<void> {}
}
