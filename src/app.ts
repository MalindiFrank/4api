import { Hono } from "@hono/hono";
// import { serveStatic } from "https://deno.land/x/hono@v3.7.0/middleware.ts";

const app = new Hono();

// Serve static files from the public directory
// app.use("/staic/*", serveStatic({ root: "./public" }));

app.get("/", async (c) => {
  const html = await Deno.readTextFile("./public/index.html");
  return c.html(html);
});

app.get("/", (c) => c.render("index.html"));

app.get("/json", (c) => c.json({ message: "Hello from Hono!" }));

app.use("*", async (c) =>  await c.json({ message: "404 Not Found" }, 404));

export default app;
