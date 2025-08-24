# src/ Folder Structure Guide

This README explains the purpose of each folder inside `src/` for your Deno + Oak REST API server, with examples for typical contents.

---

## config/
**Purpose:** Store configuration files and environment settings.
**Examples:**
- `config.ts` — Loads environment variables, app settings, or database config.

```ts
// config/config.ts
export const APP_PORT = Deno.env.get('PORT') || 8000;
export const DB_URI = Deno.env.get('DB_URI') || '';
```

---

## controller/
**Purpose:** Contains route handler functions (controllers) for each API endpoint.
**Examples:**
- `userController.ts` — Handles user-related requests.

```ts
// controller/userController.ts
import { Context } from "oak";
export const getUsers = (ctx: Context) => {
  ctx.response.body = [{ id: 1, name: "Alice" }];
};
```

---

## middlewares/
**Purpose:** Custom Oak middlewares for request/response processing.
**Examples:**
- `logger.ts` — Logs incoming requests.

```ts
// middlewares/logger.ts
import { Middleware } from "oak";
export const logger: Middleware = async (ctx, next) => {
  console.log(`${ctx.request.method} ${ctx.request.url}`);
  await next();
};
```

---

## models/
**Purpose:** Data models, interfaces, or schemas for your app.
**Examples:**
- `user.ts` — Defines the User interface.

```ts
// models/user.ts
export interface User {
  id: number;
  name: string;
}
```

---

## routes/
**Purpose:** Route definitions, mapping paths to controllers.
**Examples:**
- `userRoutes.ts` — Defines user-related routes.

```ts
// routes/userRoutes.ts
import { Router } from "oak";
import { getUsers } from "../controller/userController.ts";
const router = new Router();
router.get("/users", getUsers);
export default router;
```

---

## services/
**Purpose:** Business logic, reusable service functions (e.g., database access).
**Examples:**
- `userService.ts` — Handles user data operations.

```ts
// services/userService.ts
import { User } from "../models/user.ts";
export const findAllUsers = (): User[] => [{ id: 1, name: "Alice" }];
```

---

## utils/
**Purpose:** Utility/helper functions used across the app.
**Examples:**
- `hash.ts` — Hashes passwords.

```ts
// utils/hash.ts
export function hashPassword(password: string): string {
  // Example hash logic
  return btoa(password);
}
```

---

## Summary
- **config/**: App settings and environment config
- **controller/**: Route handler functions
- **middlewares/**: Custom Oak middlewares
- **models/**: Data models/interfaces
- **routes/**: Route definitions
- **services/**: Business logic/services
- **utils/**: Helper functions

This separation keeps your code organized, maintainable, and scalable. Each folder has a clear responsibility, and you can easily add new features by following this structure.
