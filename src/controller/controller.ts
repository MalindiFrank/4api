import { Context } from "@hono/hono";

export function getHtml(c: Context): Response {
  const html = "<h1>4 API</h1>"
  return c.html(html)
}

export function getJson(c: Context): Response {
  const json = {message: "json"}
  return c.json(json)}
