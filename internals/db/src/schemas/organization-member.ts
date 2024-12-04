import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { organization } from "./organization";
import { organizationRoleEnum } from "./organization-invitation";
import { user } from "./user";

// Organization members table
export const organizationMember = pgTable("organization_member", {
  created_at: timestamp("created_at").defaultNow(),
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  organization_id: text("organization_id")
    .notNull()
    .references(() => organization.id),
  role: organizationRoleEnum().notNull(),
  updated_at: timestamp("updated_at").defaultNow(),
  user_id: text("user_id")
    .notNull()
    .references(() => user.id),
});

export const organizationMemberRelations = relations(
  organizationMember,
  ({ one }) => ({
    organization: one(organization, {
      fields: [organizationMember.organization_id],
      references: [organization.id],
    }),
    user: one(user, {
      fields: [organizationMember.user_id],
      references: [user.id],
    }),
  }),
);
