import type { NodePgClient, NodePgDatabase } from "drizzle-orm/node-postgres";

import type * as schema from "./schemas";

// exports
export { Pool } from "pg";
export * from "./types";
export { drizzle } from "drizzle-orm/node-postgres";
export * as schema from "./schemas";
export * from "drizzle-orm";
export type Database = NodePgDatabase<typeof schema> & {
  $client: NodePgClient;
};
