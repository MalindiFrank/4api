import { Context, Next } from "@hono/hono";
import { logRequest, logError } from "../utils/logger.ts";

/**
 * Request logging middleware
 * Logs all incoming HTTP requests with method, path, and timestamp
 */
export const requestLogger = async (c: Context, next: Next) => {
  const start = Date.now();
  const method = c.req.method;
  const path = c.req.path;
  const userAgent = c.req.header("user-agent") || "Unknown";

  logRequest(`${method} ${path}`, { userAgent });

  try {
    await next();
    const duration = Date.now() - start;
    logRequest(`${method} ${path} - ${c.res.status} (${duration}ms)`);
  } catch (error) {
    const duration = Date.now() - start;
    logError(`${method} ${path} - Error (${duration}ms)`, error);
    throw error; // Re-throw to let other error handlers deal with it
  }
};

/**
 * Route-specific logging middleware
 * Logs when specific routes are accessed
 */
export const routeLogger = (routeName: string) => {
  return async (c: Context, next: Next) => {
    logRequest(`Route accessed: ${routeName}`, {
      path: c.req.path,
      params: c.req.param()
    });
    await next();
  };
};

/**
 * Error logging middleware
 * Catches and logs any unhandled errors
 */
export const errorLogger = async (c: Context, next: Next) => {
  try {
    await next();
  } catch (error) {
    logError("Unhandled error in request", error, {
      method: c.req.method,
      path: c.req.path,
      userAgent: c.req.header("user-agent")
    });

    // Return a generic error response
    return c.json({
      status: "ERROR",
      message: "Internal server error"
    }, 500);
  }
};