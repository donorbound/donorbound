import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { user } from "./user"; // Assuming user schema exists

export const userAccount = pgTable("user_account", {
  access_token: text("access_token"),
  access_token_expires_at: timestamp("access_token_expires_at"),
  account_id: text("account_id").notNull(),
  created_at: timestamp("created_at").defaultNow(),
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  password: text("password"),
  provider_id: text("provider_id").notNull(),
  refresh_token: text("refresh_token"),
  refresh_token_expires_at: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  updated_at: timestamp("updated_at").defaultNow(),
  user_id: text("user_id")
    .notNull()
    .references(() => user.id),
});

// Relations
export const accountRelations = relations(userAccount, ({ one }) => ({
  user: one(user, {
    fields: [userAccount.user_id],
    references: [user.id],
  }),
}));
