import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { jsonb, pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { authorizedSignatory } from "./authorized-signatory";
import { building } from "./building";
import { connectedNonprofit } from "./connected-nonprofit";
import { donation } from "./donation";
import { fund } from "./fund";
import { gasdsTracking } from "./gasds-tracking";
import { giftAidAdjustment } from "./gift-aid-adjustment";
import { supporter } from "./supporter";
import { user } from "./user";

export const organization = pgTable("organization", {
  account_number: text("account_number").notNull(),
  charity_number: text("charity_number"),
  charity_regulator: text("charity_regulator").notNull(),
  created_at: timestamp("created_at").defaultNow(),
  hmrc_reference: text("hmrc_reference").notNull(),
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  logo: text("logo"),
  metadata: jsonb("metadata"),
  name: text("name").notNull(),
  slug: text("slug").notNull(),
  updated_at: timestamp("updated_at").defaultNow(),
});

// id	string	PK	Unique identifier for each organization
// name	string	-	The name of the organization
// slug	string	-	The slug of the organization
// logo	string	?	The logo of the organization
// metadata	string	?	Additional metadata for the organization
// createdAt	Date	-	Timestamp of when the organization was created
export const organizationRelations = relations(organization, ({ many }) => ({
  authorizedSignatory: many(authorizedSignatory),
  building: many(building),
  connectedCharities: many(connectedNonprofit),
  donation: many(donation),
  fund: many(fund),
  gasdsTracking: many(gasdsTracking),
  giftAidAdjustment: many(giftAidAdjustment),
  supporter: many(supporter),
  user: many(user),
}));
