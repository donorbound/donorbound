import { Log } from "@donorbound/logs";
import type { LogSchema } from "@donorbound/logs/types";
import type { Metric } from "@donorbound/metrics";
import type { Metrics } from "./interface";

export class LogdrainMetrics implements Metrics {
  private readonly requestId: string;
  private readonly isolateId: string | undefined;
  private readonly environment: LogSchema["environment"];

  constructor(options: {
    requestId: string;
    isolateId: string | undefined;
    environment: LogSchema["environment"];
  }) {
    this.requestId = options.requestId;
    this.isolateId = options.isolateId;
    this.environment = options.environment;
  }

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

  public async flush(): Promise<void> {
    return;
  }
}
