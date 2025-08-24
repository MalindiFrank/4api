/**
 * Logging utility functions
 * Provides structured logging with different levels and formatting
 */

export enum LogLevel {
  DEBUG = "DEBUG",
  INFO = "INFO", 
  WARN = "WARN",
  ERROR = "ERROR"
}

interface LogContext {
  [key: string]: unknown;
}

/**
 * Get current timestamp in ISO format
 */
const getTimestamp = (): string => {
  return new Date().toISOString();
};

/**
 * Format log message with timestamp and level
 */
const formatLogMessage = (level: LogLevel, message: string, context?: LogContext): string => {
  const timestamp = getTimestamp();
  let logMessage = `[${timestamp}] [${level}] ${message}`;
  
  if (context && Object.keys(context).length > 0) {
    logMessage += ` | Context: ${JSON.stringify(context)}`;
  }
  
  return logMessage;
};

/**
 * Log debug messages (development only)
 */
export const logDebug = (message: string, context?: LogContext): void => {
  if (Deno.env.get("NODE_ENV") === "development") {
    console.log(formatLogMessage(LogLevel.DEBUG, message, context));
  }
};

/**
 * Log informational messages
 */
export const logInfo = (message: string, context?: LogContext): void => {
  console.log(formatLogMessage(LogLevel.INFO, message, context));
};

/**
 * Log warning messages
 */
export const logWarn = (message: string, context?: LogContext): void => {
  console.warn(formatLogMessage(LogLevel.WARN, message, context));
};

/**
 * Log error messages
 */
export const logError = (message: string, error?: unknown, context?: LogContext): void => {
  const errorContext = { ...context };
  
  if (error instanceof Error) {
    errorContext.error = {
      name: error.name,
      message: error.message,
      stack: error.stack
    };
  } else if (error) {
    errorContext.error = error;
  }
  
  console.error(formatLogMessage(LogLevel.ERROR, message, errorContext));
};

/**
 * Log HTTP requests
 */
export const logRequest = (message: string, context?: LogContext): void => {
  logInfo(`REQUEST: ${message}`, context);
};

/**
 * Log service operations
 */
export const logService = (message: string, context?: LogContext): void => {
  logDebug(`SERVICE: ${message}`, context);
};

/**
 * Log controller operations
 */
export const logController = (message: string, context?: LogContext): void => {
  logDebug(`CONTROLLER: ${message}`, context);
};

/**
 * Log route operations
 */
export const logRoute = (message: string, context?: LogContext): void => {
  logDebug(`ROUTE: ${message}`, context);
};
