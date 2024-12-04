import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { organization } from "./organization";
import { user } from "./user";

export const invitationStatusEnum = pgEnum("status", [
  "accepted",
  "canceled",
  "pending",
  "rejected",
]);

export const organizationRoleEnum = pgEnum("role", [
  "admin",
  "member",
  "owner",
]);

export const organizationInvitation = pgTable("organization_invitation", {
  created_at: timestamp("created_at").defaultNow(),
  email: text("email").notNull(),
  expires_at: timestamp("expires_at").notNull(),
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  inviter_id: text("inviter_id")
    .notNull()
    .references(() => user.id),
  organization_id: text("organization_id")
    .notNull()
    .references(() => organization.id),
  role: organizationRoleEnum().notNull(),
  status: invitationStatusEnum().notNull().default("pending"),
  updated_at: timestamp("updated_at").defaultNow(),
});

export const organizationInvitationRelations = relations(
  organizationInvitation,
  ({ one }) => ({
    organization: one(organization, {
      fields: [organizationInvitation.organization_id],
      references: [organization.id],
    }),
  }),
);
