# src/ Folder Structure Guide

This README explains the purpose of each folder inside `src/` with examples for typical contents.

---

## config/
**Purpose:** Store configuration files and environment settings.
**Examples:**
- `config.ts` — Loads environment variables, app settings, or database config.

```ts
// config/config.ts
export const APP_PORT = Deno.env.get('PORT') || 4040;
export const DB_PATH = './src/db/';
```

---

## controller/
**Purpose:** Contains route handler functions (controllers) for each API endpoint.
**Examples:**
- `controller.ts` — Handles collection requests (words, quotes, colors).

```ts
// controller/controller.ts
import { Context } from "@hono/hono";
export async function getCollection(c: Context): Promise<Response> {
  const collection = c.req.param('collection');
  // Handle collection logic
}
```

---

## middlewares/
**Purpose:** Custom Hono middlewares for request/response processing.
**Examples:**
- `validation.ts` — Validates collection parameters and handles CORS.
- `logger.ts` — Logs incoming requests and errors.

```ts
// middlewares/validation.ts
import { Context, Next } from "@hono/hono";
export const validateCollection = async (c: Context, next: Next) => {
  const validCollections = ["colors", "words", "quotes"];
  // Validation logic
};
```

---

## models/
**Purpose:** Data models, interfaces, or schemas for your app.
**Examples:**
- `models.ts` — Defines Word, Quote, and Color interfaces.

```ts
// models/models.ts
export interface Word {
  id: number;
  name: string;
  figure: string;
  definition: string;
}
```

---

## routes/
**Purpose:** Route definitions, mapping paths to controllers.
**Examples:**
- `routes.ts` — Defines collection routes for words, quotes, and colors.

```ts
// routes/routes.ts
import { Hono } from "@hono/hono";
export function registerRoutes(app: Hono) {
  app.get("/:collection", getCollection);
  app.get("/:collection/random", getRandomCollectionItem);
}
```

---

## services/
**Purpose:** Business logic, reusable service functions (e.g., data access).
**Examples:**
- `service.ts` — Handles data operations for collections.

```ts
// services/service.ts
export async function getCollectionArray(collection: string) {
  // Business logic for fetching collection data
}
```

---

## utils/
**Purpose:** Utility/helper functions used across the app.
**Examples:**
- `helper.ts` — File reading and data parsing utilities.
- `logger.ts` — Logging utilities for the application.

```ts
// utils/helper.ts
export async function readJsonFile(filename: string): Promise<JSONObject> {
  return JSON.parse(await Deno.readTextFile(filename));
}
```

---

## db/
**Purpose:** JSON data files for the API collections.
**Examples:**
- `words.json` — Contains word definitions and grammatical figures.
- `quotes.json` — Contains inspirational quotes with authors.
- `colors.json` — Contains color pairs (background and text colors).

---

## Summary
- **config/**: App settings and environment config
- **controller/**: Route handler functions for collections
- **middlewares/**: Custom Hono middlewares (validation, CORS, logging)
- **models/**: Data models/interfaces (Word, Quote, Color)
- **routes/**: Route definitions for the 4-API endpoints
- **services/**: Business logic for data operations
- **utils/**: Helper functions (file reading, logging)
- **db/**: JSON data storage files

