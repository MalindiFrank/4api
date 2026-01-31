// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  console.log("import.meta.main = true");
}

import app from "./src/app.ts";
const PORT = 4040;

Deno.serve({ port: PORT }, app.fetch);
