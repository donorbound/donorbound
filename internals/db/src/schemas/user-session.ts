import { createId } from "@paralleldrive/cuid2";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { user } from "./user";

export const userSession = pgTable("user_session", {
  // id
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  //
  active_organization_id: text("active_organization_id"),
  created_at: timestamp("created_at").defaultNow(),
  expires_at: timestamp("expires_at").notNull(),
  ip_address: text("ip_address"),
  token: text("token").notNull(),
  updated_at: timestamp("updated_at").defaultNow(),
  user_agent: text("user_agent"),
  user_id: text("user_id")
    .notNull()
    .references(() => user.id),
});
