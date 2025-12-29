CREATE SCHEMA "better_auth";

--> statement-breakpoint
CREATE TYPE "better_auth"."account_provider" AS ENUM('google');

--> statement-breakpoint
CREATE TYPE "better_auth"."user_role" AS ENUM('admin', 'user');

--> statement-breakpoint
CREATE TABLE "better_auth"."accounts" (
  "id" UUID PRIMARY KEY NOT NULL,
  "account_id" TEXT NOT NULL,
  "provider_id" "better_auth"."account_provider" NOT NULL,
  "user_id" UUID NOT NULL,
  "access_token" TEXT,
  "refresh_token" TEXT,
  "id_token" TEXT,
  "access_token_expires_at" TIMESTAMP,
  "refresh_token_expires_at" TIMESTAMP,
  "scope" TEXT,
  "password" TEXT,
  "created_at" TIMESTAMP NOT NULL,
  "updated_at" TIMESTAMP NOT NULL
);

--> statement-breakpoint
CREATE TABLE "better_auth"."sessions" (
  "id" UUID PRIMARY KEY NOT NULL,
  "expires_at" TIMESTAMP NOT NULL,
  "token" TEXT NOT NULL,
  "created_at" TIMESTAMP NOT NULL,
  "updated_at" TIMESTAMP NOT NULL,
  "ip_address" TEXT,
  "user_agent" TEXT,
  "user_id" UUID NOT NULL,
  "impersonated_by" TEXT,
  CONSTRAINT "sessions_token_unique" UNIQUE ("token")
);

--> statement-breakpoint
CREATE TABLE "better_auth"."users" (
  "id" UUID PRIMARY KEY NOT NULL,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "email_verified" BOOLEAN DEFAULT FALSE NOT NULL,
  "image" TEXT,
  "created_at" TIMESTAMP NOT NULL,
  "updated_at" TIMESTAMP NOT NULL,
  "role" "better_auth"."user_role" DEFAULT 'user' NOT NULL,
  "banned" BOOLEAN DEFAULT FALSE,
  "ban_reason" TEXT,
  "ban_expires" TIMESTAMP,
  "is_anonymous" BOOLEAN DEFAULT FALSE,
  CONSTRAINT "users_email_unique" UNIQUE ("email")
);

--> statement-breakpoint
CREATE TABLE "better_auth"."verifications" (
  "id" UUID PRIMARY KEY NOT NULL,
  "identifier" TEXT NOT NULL,
  "value" TEXT NOT NULL,
  "expires_at" TIMESTAMP NOT NULL,
  "created_at" TIMESTAMP NOT NULL,
  "updated_at" TIMESTAMP NOT NULL
);

--> statement-breakpoint
ALTER TABLE "better_auth"."accounts"
ADD CONSTRAINT "accounts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "better_auth"."users" ("id") ON DELETE CASCADE ON UPDATE NO ACTION;

--> statement-breakpoint
ALTER TABLE "better_auth"."sessions"
ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "better_auth"."users" ("id") ON DELETE CASCADE ON UPDATE NO ACTION;

--> statement-breakpoint
CREATE INDEX "accounts_userId_idx" ON "better_auth"."accounts" USING btree ("user_id");

--> statement-breakpoint
CREATE INDEX "sessions_userId_idx" ON "better_auth"."sessions" USING btree ("user_id");

--> statement-breakpoint
CREATE INDEX "verifications_identifier_idx" ON "better_auth"."verifications" USING btree ("identifier");
