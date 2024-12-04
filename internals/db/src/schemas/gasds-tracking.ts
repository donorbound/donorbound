import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, decimal } from "drizzle-orm/pg-core";

import { organization } from "./organization";

export const gasdsTracking = pgTable("gasds_tracking", {
  claimed_amount: decimal("claimed_amount", { precision: 10, scale: 2 })
    .default("0")
    .notNull(),
  created_at: timestamp("created_at").defaultNow(),
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  organization_id: text("organization_id")
    .notNull()
    .references(() => organization.id),
  posted_amount: decimal("posted_amount", { precision: 10, scale: 2 })
    .default("0")
    .notNull(),
  tax_year: text("tax_year").notNull(),
  updated_at: timestamp("updated_at").defaultNow(),
});

export const gasdsAdjustment = pgTable("gasds_adjustment", {
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  created_at: timestamp("created_at").defaultNow(),
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  note: text("note").notNull(),
  organization_id: text("organization_id")
    .notNull()
    .references(() => organization.id),
  updatedupdated_atAt: timestamp("updated_at").defaultNow(),
});

export const gasdsTrackingRelations = relations(gasdsTracking, ({ one }) => ({
  organization: one(organization, {
    fields: [gasdsTracking.organization_id],
    references: [organization.id],
  }),
}));

export const gasdsAdjustmentRelations = relations(
  gasdsAdjustment,
  ({ one }) => ({
    organizations: one(organization, {
      fields: [gasdsAdjustment.organization_id],
      references: [organization.id],
    }),
  }),
);
