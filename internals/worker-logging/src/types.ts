/**
 * Type representing additional fields for logging.
 * @typedef {Object.<string, unknown>} Fields
 */
export type Fields = {
  [field: string]: unknown;
};

/**
 * Interface representing a logger with various log levels.
 * @interface
 */
export interface Logger {
  /**
   * Logs a debug message.
   * @param {string} message - The message to log.
   * @param {Fields} [fields] - Additional fields for logging.
   */
  debug(message: string, fields?: Fields): void;

  /**
   * Logs an info message.
   * @param {string} message - The message to log.
   * @param {Fields} [fields] - Additional fields for logging.
   */
  info(message: string, fields?: Fields): void;

  /**
   * Logs a warning message.
   * @param {string} message - The message to log.
   * @param {Fields} [fields] - Additional fields for logging.
   */
  warn(message: string, fields?: Fields): void;

  /**
   * Logs an error message.
   * @param {string} message - The message to log.
   * @param {Fields} [fields] - Additional fields for logging.
   */
  error(message: string, fields?: Fields): void;
}
