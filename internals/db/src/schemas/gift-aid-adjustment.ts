import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { decimal, pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { organization } from "./organization";

export const giftAidAdjustment = pgTable("gift_aid_adjustment", {
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  created_at: timestamp("created_at").defaultNow(),
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  note: text("note").notNull(),
  organization_id: text("organization_id")
    .notNull()
    .references(() => organization.id),
  updated_at: timestamp("updated_at").defaultNow(),
});

export const giftAidAdjustmentRelations = relations(
  giftAidAdjustment,
  ({ one }) => ({
    organizations: one(organization, {
      fields: [giftAidAdjustment.organization_id],
      references: [organization.id],
    }),
  }),
);
