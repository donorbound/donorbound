import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  boolean,
  decimal,
} from "drizzle-orm/pg-core";

import { building } from "./building";
import { fund } from "./fund";
import { organization } from "./organization";
import { supporter } from "./supporter";

export const donation = pgTable("donation", {
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  building_id: text("building_id").references(() => building.id),
  created_at: timestamp("created_at").defaultNow(),
  date: timestamp("date").notNull(),
  donation_type: text("donation_type", {
    enum: ["INDIVIDUAL", "LOOSE_CASH", "SPONSORED", "AGGREGATED", "GASDS"],
  }).notNull(),
  donor_id: text("donor_id").references(() => supporter.id),
  fund_id: text("fund_id")
    .notNull()
    .references(() => fund.id),
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  is_gift_aid_eligible: boolean("is_gift_aid_eligible").default(true),
  is_recurring: boolean("is_recurring").default(false),
  note: text("note").notNull(),
  organization_id: text("organization_id")
    .notNull()
    .references(() => organization.id),
  payment_type: text("payment_type", {
    enum: [
      "ENVELOPES",
      "CASH",
      "CHECK",
      "BANK_TRANSFER",
      "CARD",
      "DIRECT_DEBIT",
      "CONTACTLESS",
    ],
  }).notNull(),
  tax_year: text("tax_year"),
  updated_at: timestamp("updated_at").defaultNow(),
});

export const donationRelations = relations(donation, ({ one }) => ({
  building: one(building, {
    fields: [donation.building_id],
    references: [building.id],
  }),
  donor: one(supporter, {
    fields: [donation.donor_id],
    references: [supporter.id],
  }),
  fund: one(fund, {
    fields: [donation.fund_id],
    references: [fund.id],
  }),
  organization: one(organization, {
    fields: [donation.organization_id],
    references: [organization.id],
  }),
}));
