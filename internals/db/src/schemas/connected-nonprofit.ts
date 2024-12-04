import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { organization } from "./organization";

export const connectedNonprofit = pgTable("connected_nonprofit", {
  created_at: timestamp("created_at").defaultNow(),
  hmrc_reference: text("hmrc_reference").notNull(),
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text("name").notNull(),
  organization_id: text("organization_id")
    .notNull()
    .references(() => organization.id),
  updated_at: timestamp("updated_at").defaultNow(),
});

export const connectedNonprofitsRelations = relations(
  connectedNonprofit,
  ({ one }) => ({
    organization: one(organization, {
      fields: [connectedNonprofit.organization_id],
      references: [organization.id],
    }),
  }),
);
