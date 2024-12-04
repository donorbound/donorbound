import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { pgTable, text } from "drizzle-orm/pg-core";

import { user } from "./user";

export const userTwoFactor = pgTable("user_two_factor", {
  backup_codes: text("backup_codes"),
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  secret: text("secret"),
  user_id: text("user_id")
    .notNull()
    .references(() => user.id),
});

export const userTwoFactorRelations = relations(userTwoFactor, ({ one }) => ({
  user: one(user, {
    fields: [userTwoFactor.user_id],
    references: [user.id],
  }),
}));
