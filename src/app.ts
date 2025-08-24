import { Hono } from "@hono/hono";
import { registerRoutes } from "./routes/routes.ts";
import { requestLogger, errorLogger } from "./middlewares/logger.ts";
import { corsMiddleware } from "./middlewares/validation.ts";
import { logInfo } from "./utils/logger.ts";

const app = new Hono();

// global middleware
app.use("*", corsMiddleware);
app.use("*", requestLogger);
app.use("*", errorLogger);

// register all routes to the app
registerRoutes(app);

logInfo("Application started with middleware + routes");

// serve static files from the public directory ~
// app.use("/static/*", serveStatic({ root: "./public" }));

// app.use("*", async (c) => {
//   return await c.json({ message: "404 Not Found" }, 404);
// });

export default app;
