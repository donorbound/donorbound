import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

import { user } from "./user"; // Assuming you have a users table defined

export const userPasskey = pgTable("user_passkey", {
  backed_up: boolean("backed_up").notNull(),
  counter: integer("counter").notNull(),
  created_at: timestamp("created_at", { mode: "date" }),
  device_type: text("device_type").notNull(),
  id: text("id").primaryKey(),
  name: text("name"),
  public_key: text("public_key").notNull(),
  transports: text("transports"),
  user_id: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  webauthn_user_id: text("webauthn_user_id").notNull(),
});

// Define the relations (optional but recommended for type safety)
export const userPasskeyRelations = relations(userPasskey, ({ one }) => ({
  users: one(user, {
    fields: [userPasskey.user_id],
    references: [user.id],
  }),
}));
