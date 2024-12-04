import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { organization } from "./organization";

export const authorizedSignatory = pgTable("authorized_signatory", {
  address1: text("address1").notNull(),
  address2: text("address2"),
  address3: text("address3"),
  country: text("country").notNull(),
  created_at: timestamp("created_at").defaultNow(),
  email: text("email").notNull(),
  first_name: text("first_name").notNull(),
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  last_name: text("last_name").notNull(),
  middle_name: text("middle_name"),
  organization_id: text("organization_id")
    .notNull()
    .references(() => organization.id),
  phone: text("phone").notNull(),
  position: text("position"),
  postal_town: text("postal_town").notNull(),
  postcode: text("postcode").notNull(),
  title: text("title"),
  updated_at: timestamp("updated_at").defaultNow(),
});

export const authorizedSignatoryRelations = relations(
  authorizedSignatory,
  ({ one }) => ({
    organization: one(organization, {
      fields: [authorizedSignatory.organization_id],
      references: [organization.id],
    }),
  }),
);
