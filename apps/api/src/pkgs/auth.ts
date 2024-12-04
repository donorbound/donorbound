import { type Database, schema } from "@donorbound/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { openAPI, organization, passkey, twoFactor } from "better-auth/plugins";

import environment from "~/environment";

export function createAuthConnection(database: Database) {
  return betterAuth({
    baseURL: `http://localhost:${environment?.PORT ?? 9999}`,
    database: drizzleAdapter(database, {
      provider: "pg",
      schema: {
        organization: schema.organization,
        organization_invitation: schema.organizationInvitation,
        organization_member: schema.organizationMember,
        user: schema.user,
        user_account: schema.userAccount,
        user_passkey: schema.userPasskey,
        user_session: schema.userSession,
        user_two_factor: schema.userTwoFactor,
        user_verification: schema.userVerification,
      },
    }),
    emailAndPassword: {
      enabled: true,
    },
    plugins: [
      passkey(),
      openAPI(),
      //@ts-expect-error todo fix this
      organization({
        schema: {
          invitation: {
            fields: {
              organizationId: "organization_id",
            },
            modelName: "organization_invitation",
          },
          member: {
            fields: {
              organizationId: "organization_id",
              userId: "user_id",
            },
            modelName: "organization_member",
          },
          organization: {
            fields: {
              createdAt: "created_at",
            },
            modelName: "organization",
          },
          session: {
            fields: {
              activeOrganizationId: "active_organization_id",
            },
            modelName: "user_session",
          },
        },
      }),
      //@ts-expect-error todo fix this
      twoFactor({
        otpOptions: {
          async sendOTP({ otp, user }) {
            console.log(otp, user);
            // send otp to user
          },
        },
      }),
    ],
    trustedOrigins: ["http://localhost:3001", "http://localhost:9999"],
    // field mappings
    account: {
      fields: {
        accessToken: "access_token",
        accessTokenExpiresAt: "access_token_expires_at",
        accountId: "account_id",
        createdAt: "created_at",
        idToken: "id_token",
        providerId: "provider_id",
        refreshToken: "refresh_token",
        refreshTokenExpiresAt: "refresh_token_expires_at",
        updatedAt: "updated_at",
        userId: "user_id",
      },
      modelName: "user_account",
    },
    session: {
      fields: {
        createdAt: "created_at",
        expiresAt: "expires_at",
        ipAddress: "ip_address",
        updatedAt: "updated_at",
        userAgent: "user_agent",
        userId: "user_id",
      },
      modelName: "user_session",
    },
    user: {
      fields: {
        createdAt: "created_at",
        emailVerified: "email_verified",
        updatedAt: "updated_at",
      },
    },
    verification: {
      fields: {
        createdAt: "created_at",
        expiresAt: "expires_at",
        updatedAt: "updated_at",
      },
      modelName: "user_verification",
    },
  });
}
