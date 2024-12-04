import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { donation } from "./donation";
import { organization } from "./organization";

export const supporter = pgTable("supporter", {
  address1: text("address1").notNull(),
  address2: text("address2"),
  address3: text("address3"),
  created_at: timestamp("created_at").defaultNow(),
  email: text("email"),
  first_name: text("first_name").notNull(),
  gift_aid_declaration_date: timestamp("gift_aid_declaration_date"),
  gift_aid_enabled: boolean("gift_aid_enabled").default(false),
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  is_overseas: boolean("is_overseas").default(false),
  last_name: text("last_name").notNull(),
  middle_name: text("middle_name"),
  notes: text("notes"),
  organization_id: text("organization_id")
    .notNull()
    .references(() => organization.id),
  postal_town: text("postal_town"),
  postcode: text("postcode"),
  reference: text("reference").notNull(),
  title: text("title"),
  updated_at: timestamp("updated_at").defaultNow(),
});

export const supporterRelations = relations(supporter, ({ many, one }) => ({
  donation: many(donation),
  organizations: one(organization, {
    fields: [supporter.organization_id],
    references: [organization.id],
  }),
}));
