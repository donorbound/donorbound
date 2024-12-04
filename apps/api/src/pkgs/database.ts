import { type Database, drizzle, schema } from "@donorbound/db";

type ConnectionOptions = {
  connectionString: string;
};

// You can specify any property from the node-postgres connection options
export function createConnection(options: ConnectionOptions): Database {
  return drizzle(options.connectionString, { logger: true, schema });
}
