import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { donation } from "./donation";
import { organization } from "./organization";

export const fund = pgTable("fund", {
  created_at: timestamp("created_at").defaultNow(),
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text("name").notNull(),
  organization_id: text("organization_id")
    .notNull()
    .references(() => organization.id),
  updated_at: timestamp("updated_at").defaultNow(),
});

export const fundRelations = relations(fund, ({ many, one }) => ({
  donation: many(donation),
  organizations: one(organization, {
    fields: [fund.organization_id],
    references: [organization.id],
  }),
}));
