CREATE TYPE "public"."status" AS ENUM('accepted', 'canceled', 'pending', 'rejected');--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('admin', 'member', 'owner');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "authorized_signatory" (
	"address1" text NOT NULL,
	"address2" text,
	"address3" text,
	"country" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"email" text NOT NULL,
	"first_name" text NOT NULL,
	"id" text PRIMARY KEY NOT NULL,
	"last_name" text NOT NULL,
	"middle_name" text,
	"organization_id" text NOT NULL,
	"phone" text NOT NULL,
	"position" text,
	"postal_town" text NOT NULL,
	"postcode" text NOT NULL,
	"title" text,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "building" (
	"address1" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"organization_id" text NOT NULL,
	"postcode" text NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "connected_nonprofit" (
	"created_at" timestamp DEFAULT now(),
	"hmrc_reference" text NOT NULL,
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"organization_id" text NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "donation" (
	"amount" numeric(10, 2) NOT NULL,
	"building_id" text,
	"created_at" timestamp DEFAULT now(),
	"date" timestamp NOT NULL,
	"donation_type" text NOT NULL,
	"donor_id" text,
	"fund_id" text NOT NULL,
	"id" text PRIMARY KEY NOT NULL,
	"is_gift_aid_eligible" boolean DEFAULT true,
	"is_recurring" boolean DEFAULT false,
	"note" text NOT NULL,
	"organization_id" text NOT NULL,
	"payment_type" text NOT NULL,
	"tax_year" text,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "fund" (
	"created_at" timestamp DEFAULT now(),
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"organization_id" text NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "gasds_adjustment" (
	"amount" numeric(10, 2) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"id" text PRIMARY KEY NOT NULL,
	"note" text NOT NULL,
	"organization_id" text NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "gasds_tracking" (
	"claimed_amount" numeric(10, 2) DEFAULT '0' NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"id" text PRIMARY KEY NOT NULL,
	"organization_id" text NOT NULL,
	"posted_amount" numeric(10, 2) DEFAULT '0' NOT NULL,
	"tax_year" text NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "gift_aid_adjustment" (
	"amount" numeric(10, 2) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"id" text PRIMARY KEY NOT NULL,
	"note" text NOT NULL,
	"organization_id" text NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "organization" (
	"account_number" text NOT NULL,
	"charity_number" text,
	"charity_regulator" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"hmrc_reference" text NOT NULL,
	"id" text PRIMARY KEY NOT NULL,
	"logo" text,
	"metadata" jsonb,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "organization_invitation" (
	"created_at" timestamp DEFAULT now(),
	"email" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"id" text PRIMARY KEY NOT NULL,
	"inviter_id" text NOT NULL,
	"organization_id" text NOT NULL,
	"role" "role" NOT NULL,
	"status" "status" DEFAULT 'pending' NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "organization_member" (
	"created_at" timestamp DEFAULT now(),
	"id" text PRIMARY KEY NOT NULL,
	"organization_id" text NOT NULL,
	"role" "role" NOT NULL,
	"updated_at" timestamp DEFAULT now(),
	"user_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "supporter" (
	"address1" text NOT NULL,
	"address2" text,
	"address3" text,
	"created_at" timestamp DEFAULT now(),
	"email" text,
	"first_name" text NOT NULL,
	"gift_aid_declaration_date" timestamp,
	"gift_aid_enabled" boolean DEFAULT false,
	"id" text PRIMARY KEY NOT NULL,
	"is_overseas" boolean DEFAULT false,
	"last_name" text NOT NULL,
	"middle_name" text,
	"notes" text,
	"organization_id" text NOT NULL,
	"postal_town" text,
	"postcode" text,
	"reference" text NOT NULL,
	"title" text,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"created_at" timestamp DEFAULT now(),
	"email" text NOT NULL,
	"email_verified" text NOT NULL,
	"id" text PRIMARY KEY NOT NULL,
	"image" text,
	"name" text NOT NULL,
	"organization_id" text,
	"password_hash" text,
	"phone" text,
	"position" text,
	"title" text,
	"two_factor_enabled" boolean DEFAULT false,
	"updated_at" timestamp DEFAULT now(),
	"user_level" text,
	"username" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_account" (
	"access_token" text,
	"access_token_expires_at" timestamp,
	"account_id" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"id" text PRIMARY KEY NOT NULL,
	"password" text,
	"provider_id" text NOT NULL,
	"refresh_token" text,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"updated_at" timestamp DEFAULT now(),
	"user_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_passkey" (
	"backed_up" boolean NOT NULL,
	"counter" integer NOT NULL,
	"created_at" timestamp,
	"device_type" text NOT NULL,
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"public_key" text NOT NULL,
	"transports" text,
	"user_id" text NOT NULL,
	"webauthn_user_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_session" (
	"id" text PRIMARY KEY NOT NULL,
	"active_organization_id" text,
	"created_at" timestamp DEFAULT now(),
	"expires_at" timestamp NOT NULL,
	"ip_address" text,
	"token" text NOT NULL,
	"updated_at" timestamp DEFAULT now(),
	"user_agent" text,
	"user_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_two_factor" (
	"backup_codes" text,
	"id" text PRIMARY KEY NOT NULL,
	"secret" text,
	"user_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_verification" (
	"created_at" timestamp DEFAULT now(),
	"expires_at" timestamp NOT NULL,
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"updated_at" timestamp DEFAULT now(),
	"value" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "authorized_signatory" ADD CONSTRAINT "authorized_signatory_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "building" ADD CONSTRAINT "building_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "connected_nonprofit" ADD CONSTRAINT "connected_nonprofit_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "donation" ADD CONSTRAINT "donation_building_id_building_id_fk" FOREIGN KEY ("building_id") REFERENCES "public"."building"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "donation" ADD CONSTRAINT "donation_donor_id_supporter_id_fk" FOREIGN KEY ("donor_id") REFERENCES "public"."supporter"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "donation" ADD CONSTRAINT "donation_fund_id_fund_id_fk" FOREIGN KEY ("fund_id") REFERENCES "public"."fund"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "donation" ADD CONSTRAINT "donation_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "fund" ADD CONSTRAINT "fund_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "gasds_adjustment" ADD CONSTRAINT "gasds_adjustment_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "gasds_tracking" ADD CONSTRAINT "gasds_tracking_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "gift_aid_adjustment" ADD CONSTRAINT "gift_aid_adjustment_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "organization_invitation" ADD CONSTRAINT "organization_invitation_inviter_id_user_id_fk" FOREIGN KEY ("inviter_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "organization_invitation" ADD CONSTRAINT "organization_invitation_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "organization_member" ADD CONSTRAINT "organization_member_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "organization_member" ADD CONSTRAINT "organization_member_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "supporter" ADD CONSTRAINT "supporter_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user" ADD CONSTRAINT "user_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_account" ADD CONSTRAINT "user_account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_passkey" ADD CONSTRAINT "user_passkey_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_session" ADD CONSTRAINT "user_session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_two_factor" ADD CONSTRAINT "user_two_factor_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
