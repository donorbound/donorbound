import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { organization } from "./organization";

export const user = pgTable("user", {
  created_at: timestamp("created_at").defaultNow(),
  email: text("email").notNull(),
  email_verified: text("email_verified").notNull(),
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  image: text("image"),
  name: text("name").notNull(),
  organization_id: text("organization_id").references(() => organization.id),
  password_hash: text("password_hash"),
  phone: text("phone"),
  position: text("position"),
  title: text("title"),
  two_factor_enabled: boolean("two_factor_enabled").default(false),
  updated_at: timestamp("updated_at").defaultNow(),
  user_level: text("user_level", { enum: ["ADMIN", "ASSISTANT"] }),
  username: text("username"),
});

export const userRelations = relations(user, ({ one }) => ({
  organization: one(organization, {
    fields: [user.organization_id],
    references: [organization.id],
  }),
}));
