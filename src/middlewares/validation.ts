import { Context, Next } from "@hono/hono";
import { logWarn } from "../utils/logger.ts";

/**
 * Validation middleware for collection parameters
 * Ensures the collection parameter is valid
 */
export const validateCollection = async (c: Context, next: Next) => {
  const collection = c.req.path.split("/")[1];
  const validCollections = ["colors", "words", "quotes"];
  
  if (!validCollections.includes(collection)) {
    logWarn("Invalid collection requested", { 
      collection, 
      path: c.req.path,
      validCollections 
    });
    
    return c.json({
      status: "ERROR",
      message: `Invalid collection '${collection}'. Valid collections are: ${validCollections.join(", ")}`
    }, 400);
  }
  
  await next();
};

/**
 * Validation middleware for ID parameters
 * Ensures the ID parameter is a valid positive integer
 */
export const validateId = async (c: Context, next: Next) => {
  const id = c.req.param("id");
  
  if (!id) {
    logWarn("Missing ID parameter", { path: c.req.path });
    return c.json({
      status: "ERROR",
      message: "ID parameter is required"
    }, 400);
  }
  
  const parsedId = Number.parseInt(id);
  if (isNaN(parsedId) || parsedId <= 0) {
    logWarn("Invalid ID parameter", { 
      id, 
      parsedId, 
      path: c.req.path 
    });
    
    return c.json({
      status: "ERROR",
      message: "ID must be a positive integer"
    }, 400);
  }
  
  await next();
};

/**
 * Validation middleware for count parameters
 * Ensures the count parameter is a valid positive integer within limits
 */
export const validateCount = async (c: Context, next: Next) => {
  const n = c.req.param("n");
  
  if (!n) {
    logWarn("Missing count parameter", { path: c.req.path });
    return c.json({
      status: "ERROR",
      message: "Count parameter is required"
    }, 400);
  }
  
  const count = Number.parseInt(n);
  if (isNaN(count) || count <= 0) {
    logWarn("Invalid count parameter", { 
      n, 
      count, 
      path: c.req.path 
    });
    
    return c.json({
      status: "ERROR",
      message: "Count must be a positive integer"
    }, 400);
  }
  
  if (count > 100) {
    logWarn("Count parameter too large", { 
      count, 
      path: c.req.path 
    });
    
    return c.json({
      status: "ERROR",
      message: "Count cannot exceed 100"
    }, 400);
  }
  
  await next();
};

/**
 * CORS middleware
 * Handles Cross-Origin Resource Sharing
 */
export const corsMiddleware = async (c: Context, next: Next) => {
  // set CORS headers
  c.res.headers.set("Access-Control-Allow-Origin", "*");
  c.res.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  c.res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  
  // handle preflight requests, ensures cors are handled
  if (c.req.method === "OPTIONS") {
    return c.newResponse(null, { status: 204 });
  }
  
  await next();
};
