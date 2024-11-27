import type { LogSchema } from "@donorbound/logs/types";

import { Log } from "@donorbound/logs";

import type { Fields, Logger } from "./types";

/**
 * Class representing a console logger.
 * Implements the Logger interface.
 */
export class ConsoleLogger implements Logger {
  private requestId: string;
  private readonly environment: LogSchema["environment"];
  private readonly application: LogSchema["application"];
  private readonly defaultFields: Fields;

  /**
   * Creates a new ConsoleLogger instance.
   * @param {Object} options - Logger options.
   * @param {string} options.requestId - The request ID.
   * @param {LogSchema["environment"]} options.environment - The environment.
   * @param {LogSchema["application"]} options.application - The application.
   * @param {Fields} [options.defaultFields] - Default fields for logging.
   */
  constructor(options: {
    requestId: string;
    environment: LogSchema["environment"];
    application: LogSchema["application"];
    defaultFields?: Fields;
  }) {
    this.requestId = options.requestId;
    this.environment = options.environment;
    this.application = options.application;
    this.defaultFields = options.defaultFields ?? {};
  }

  /**
   * Marshals log data into a string.
   * @param {"debug" | "info" | "warn" | "error" | "fatal"} level - Log level.
   * @param {string} message - Log message.
   * @param {Fields} [fields] - Additional fields for logging.
   * @returns {string} The marshaled log string.
   */
  private marshal(
    level: "debug" | "info" | "warn" | "error" | "fatal",
    message: string,
    fields?: Fields,
  ): string {
    return new Log({
      application: this.application,
      context: { ...this.defaultFields, ...fields },
      environment: this.environment,
      level,
      message,
      requestId: this.requestId,
      time: Date.now(),
      type: "log",
    }).toString();
  }

  /**
   * Logs a debug message.
   * @param {string} message - The message to log.
   * @param {Fields} [fields] - Additional fields for logging.
   */
  public debug(message: string, fields?: Fields): void {
    console.debug(this.marshal("debug", message, fields));
  }

  /**
   * Logs an info message.
   * @param {string} message - The message to log.
   * @param {Fields} [fields] - Additional fields for logging.
   */
  public info(message: string, fields?: Fields): void {
    console.info(this.marshal("info", message, fields));
  }

  /**
   * Logs a warning message.
   * @param {string} message - The message to log.
   * @param {Fields} [fields] - Additional fields for logging.
   */
  public warn(message: string, fields?: Fields): void {
    console.warn(this.marshal("warn", message, fields));
  }

  /**
   * Logs an error message.
   * @param {string} message - The message to log.
   * @param {Fields} [fields] - Additional fields for logging.
   */
  public error(message: string, fields?: Fields): void {
    console.error(this.marshal("error", message, fields));
  }

  /**
   * Logs a fatal error message.
   * @param {string} message - The message to log.
   * @param {Fields} [fields] - Additional fields for logging.
   */
  public fatal(message: string, fields?: Fields): void {
    console.error(this.marshal("fatal", message, fields));
  }

  /**
   * Sets the request ID for the logger.
   * @param {string} requestId - The new request ID.
   */
  public setRequestId(requestId: string): void {
    this.requestId = requestId;
  }
}
