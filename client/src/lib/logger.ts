/**
 * Custom Logger for Next.js Applications
 *
 * A feature-rich logging solution that supports both console and file output with
 * structured JSON logging, color-coded console output, and configurable log levels.
 *
 * Features:
 * - Color-coded console output using Chalk
 * - Structured JSON logging to files (JSONL format)
 * - Configurable log levels (debug, info, warn, error)
 * - Log buffering for performance
 * - Child loggers with service context
 * - Automatic log directory creation
 * - Environment-aware configuration
 *
 * @example
 * // Basic usage
 * import { logger } from '@/lib/logger';
 *
 * logger.info('User logged in', { userId: 123, email: 'user@example.com' });
 * logger.error('Database connection failed', { error: 'Connection timeout' });
 *
 * @example
 * // Child logger with service context
 * const authLogger = logger.child('auth');
 * authLogger.info('Token validated', { token: 'abc123', expiresAt: '2024-01-20' });
 *
 * @example
 * // Custom logger configuration
 * import { Logger } from '@/lib/logger';
 *
 * const customLogger = new Logger({
 *   level: 'debug',
 *   logFilePath: '/custom/path/logs.jsonl',
 *   service: 'api',
 *   enableFileLogging: true,
 *   enableConsoleLogging: true
 * });
 *
 * @example
 * // Log levels and their usage
 * logger.debug('Detailed debugging information', { requestId: 'req-123' });
 * logger.info('General information about application flow', { action: 'user_login' });
 * logger.warn('Warning messages for potentially harmful situations', { deprecated: true });
 * logger.error('Error events that might still allow the application to continue', { statusCode: 500 });
 *
 * @example
 * // Cleanup when shutting down
 * process.on('SIGINT', () => {
 *   logger.destroy();
 *   process.exit(0);
 * });
 *
 * Configuration Options:
 * - level: Set minimum log level ('debug' | 'info' | 'warn' | 'error')
 * - logFilePath: Path to the log file (default: './logs/app.jsonl')
 * - enableFileLogging: Enable/disable file logging (default: true)
 * - enableConsoleLogging: Enable/disable console logging (default: true)
 * - service: Service name for log context (default: 'app')
 *
 * Log File Format (JSONL):
 * Each line is a valid JSON object with the following structure:
 * {
 *   "timestamp": "2024-01-15T10:30:45.123Z",
 *   "level": "info",
 *   "message": "User logged in",
 *   "data": { "userId": 123 },
 *   "environment": "development",
 *   "service": "auth"
 * }
 *
 * Console Output:
 * - Color-coded by log level (blue=debug, green=info, yellow=warn, red=error)
 * - Human-readable timestamps
 * - Formatted JSON data
 *
 * Performance Features:
 * - Log buffering (flushes every 5 seconds or when buffer is full)
 * - Asynchronous file writing
 * - Configurable buffer size (default: 10 entries)
 *
 * @author Your Name
 * @version 1.0.0
 * @since 2024-01-15
 */

import { appendFileSync, existsSync, mkdirSync } from "fs";
import { join, dirname } from "path";

import chalk from "chalk";

// Types
type LogLevel = "debug" | "info" | "warn" | "error";

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  data: unknown;
  environment: string;
  service?: string;
}

interface LoggerConfig {
  level?: LogLevel;
  logFilePath?: string;
  enableFileLogging?: boolean;
  enableConsoleLogging?: boolean;
  service?: string;
}

// Configuration
const DEFAULT_CONFIG: Required<LoggerConfig> = {
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  logFilePath: join(process.cwd(), "logs", "app.jsonl"),
  enableFileLogging: true,
  enableConsoleLogging: true,
  service: "app",
};

/**
 * Custom logger class with file and console output support
 */
class Logger {
  private config: Required<LoggerConfig>;
  private logBuffer: LogEntry[] = [];
  private bufferSize = 10;
  private flushInterval: NodeJS.Timeout | null = null;

  constructor(config: LoggerConfig = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.ensureLogDirectory();
    this.startBufferFlush();
  }

  /**
   * Ensures the log directory exists
   */
  private ensureLogDirectory(): void {
    try {
      const logDir = dirname(this.config.logFilePath);
      if (!existsSync(logDir)) {
        mkdirSync(logDir, { recursive: true });
      }
    } catch (error) {
      console.error("Failed to create log directory:", error);
    }
  }

  /**
   * Starts periodic buffer flushing
   */
  private startBufferFlush(): void {
    if (this.config.enableFileLogging) {
      this.flushInterval = setInterval(() => {
        this.flushBuffer();
      }, 5000); // Flush every 5 seconds
    }
  }

  /**
   * Stops the buffer flush interval
   */
  public destroy(): void {
    if (this.flushInterval) {
      clearInterval(this.flushInterval);
      this.flushBuffer(); // Final flush
    }
  }

  /**
   * Checks if the given level should be logged
   */
  private shouldLog(level: LogLevel): boolean {
    const levels: Record<LogLevel, number> = {
      debug: 0,
      info: 1,
      warn: 2,
      error: 3,
    };
    return levels[level] >= levels[this.config.level];
  }

  /**
   * Formats message for console output with colors
   */
  private formatConsoleMessage(
    level: LogLevel,
    message: string,
    data?: unknown
  ): string {
    const timestamp = new Date().toLocaleString();

    const levelColors = {
      debug: chalk.blue.bold,
      info: chalk.green.bold,
      warn: chalk.yellow.bold,
      error: chalk.red.bold,
    };

    const coloredLevel = levelColors[level](level.toUpperCase());
    const coloredMessage = levelColors[level](message);
    const baseMessage = `${coloredLevel}: ${coloredMessage}\n${chalk.gray(`DATETIME: ${timestamp}`)}`;

    if (data) {
      const jsonData = JSON.stringify(data, null, 2);
      return `${baseMessage}\n${chalk.cyan(jsonData)}`;
    }

    return baseMessage;
  }

  /**
   * Writes log entry to file
   */
  private writeToFile(logEntry: LogEntry): void {
    try {
      const jsonLine = JSON.stringify(logEntry) + "\n";
      appendFileSync(this.config.logFilePath, jsonLine, "utf8");
    } catch (error) {
      console.error("Failed to write to log file:", error);
    }
  }

  /**
   * Adds log entry to buffer
   */
  private addToBuffer(logEntry: LogEntry): void {
    this.logBuffer.push(logEntry);

    if (this.logBuffer.length >= this.bufferSize) {
      this.flushBuffer();
    }
  }

  /**
   * Flushes the log buffer to file
   */
  private flushBuffer(): void {
    if (this.logBuffer.length === 0) return;

    try {
      const logLines =
        this.logBuffer.map((entry) => JSON.stringify(entry)).join("\n") + "\n";
      appendFileSync(this.config.logFilePath, logLines, "utf8");
      this.logBuffer = [];
    } catch (error) {
      console.error("Failed to flush log buffer:", error);
    }
  }

  /**
   * Main logging method
   */
  private log(level: LogLevel, message: string, data?: unknown): void {
    if (!this.shouldLog(level)) return;

    const timestamp = new Date().toISOString();
    const logEntry: LogEntry = {
      timestamp,
      level,
      message,
      data: data ?? null,
      environment:
        process.env.NODE_ENV === "production" ? "production" : "development",
      service: this.config.service,
    };

    // Console output
    if (this.config.enableConsoleLogging) {
      const formattedMessage = this.formatConsoleMessage(level, message, data);
      switch (level) {
        case "debug":
          console.debug(formattedMessage);
          break;
        case "info":
          console.info(formattedMessage);
          break;
        case "warn":
          console.warn(formattedMessage);
          break;
        case "error":
          console.error(formattedMessage);
          break;
      }
    }

    // File output
    if (this.config.enableFileLogging) {
      this.addToBuffer(logEntry);
    }
  }

  // Public logging methods
  debug(message: string, data?: unknown): void {
    this.log("debug", message, data);
  }

  info(message: string, data?: unknown): void {
    this.log("info", message, data);
  }

  warn(message: string, data?: unknown): void {
    this.log("warn", message, data);
  }

  error(message: string, data?: unknown): void {
    this.log("error", message, data);
  }

  /**
   * Creates a child logger with additional context
   */
  child(service: string): Logger {
    return new Logger({ ...this.config, service });
  }
}

// Export singleton instance
export const logger = new Logger();

// Export class for custom instances
export { Logger };
export type { LogLevel, LogEntry, LoggerConfig };
