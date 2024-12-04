import type { InferSelectModel } from "drizzle-orm";

import type * as schema from "./schemas";

// domain specific models
export type AuthorizedSignatory = InferSelectModel<
  typeof schema.authorizedSignatory
>;
export type Building = InferSelectModel<typeof schema.building>;
export type ConnectedNonprofit = InferSelectModel<
  typeof schema.connectedNonprofit
>;
export type Donation = InferSelectModel<typeof schema.donation>;
export type Funds = InferSelectModel<typeof schema.fund>;
export type GASDSAdjustment = InferSelectModel<typeof schema.gasdsAdjustment>;
export type GASDSTracking = InferSelectModel<typeof schema.gasdsTracking>;
export type GiftAidAdjustment = InferSelectModel<
  typeof schema.giftAidAdjustment
>;
export type Supporter = InferSelectModel<typeof schema.supporter>;

// organization models
export type Organization = InferSelectModel<typeof schema.organization>;
export type OrganizationInvitation = InferSelectModel<
  typeof schema.organizationInvitation
>;
export type OrganizationMember = InferSelectModel<
  typeof schema.organizationMember
>;

// user models
export type User = InferSelectModel<typeof schema.user>;
export type UserAccount = InferSelectModel<typeof schema.userAccount>;
export type UserPasskey = InferSelectModel<typeof schema.userPasskey>;
export type UserSession = InferSelectModel<typeof schema.userSession>;
export type UserTwoFactor = InferSelectModel<typeof schema.userTwoFactor>;
export type UserVerification = InferSelectModel<typeof schema.userVerification>;
