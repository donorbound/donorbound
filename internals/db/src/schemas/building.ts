import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { donation } from "./donation";
import { organization } from "./organization";

export const building = pgTable("building", {
  address1: text("address1").notNull(),
  created_at: timestamp("created_at").defaultNow(),
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text("name").notNull(),
  organization_id: text("organization_id")
    .notNull()
    .references(() => organization.id),
  postcode: text("postcode").notNull(),
  updated_at: timestamp("updated_at").defaultNow(),
});

export const buildingRelations = relations(building, ({ many, one }) => ({
  donation: many(donation),
  organization: one(organization, {
    fields: [building.organization_id],
    references: [organization.id],
  }),
}));
