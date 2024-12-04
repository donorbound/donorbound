import { serve } from "@hono/node-server";

import environment from "./environment";
import { createHonoApp } from "./pkgs/hono/create-hono-app";
import { registerV1Liveness } from "./routes/v1-liveness";

const port = environment?.PORT ?? 9999;

console.log(`Server is running on port http://localhost:${port}`);

const app = createHonoApp();

/**
 * Registering all route handlers
 */
registerV1Liveness(app);

serve({
  fetch: app.fetch,
  port,
});
