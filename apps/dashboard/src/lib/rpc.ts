// better-call (saul) client

import { createClient } from "better-call/client";

import type { router } from "~/app/api/[[...route]]/route";

export const client = createClient<typeof router>({
  baseURL: "http://localhost:3001/api",
});
