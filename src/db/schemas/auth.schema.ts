import { relations } from "drizzle-orm";
import * as d from "drizzle-orm/pg-core";
import { timestamp } from "@/db/custom/utils";
import { accountProviders, userRoles } from "./auth.values";

export const betterAuth = d.pgSchema("better_auth");

export const userRole = betterAuth.enum("user_role", userRoles);

export const users = betterAuth.table("users", {
  id: d.uuid("id").primaryKey(),
  name: d.text("name").notNull(),
  email: d.text("email").notNull().unique(),
  emailVerified: d.boolean("email_verified").default(false).notNull(),
  image: d.text("image"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => new Date().toISOString())
    .notNull(),
  role: userRole().default("user").notNull(),
  banned: d.boolean("banned").default(false),
  banReason: d.text("ban_reason"),
  banExpires: timestamp("ban_expires"),
  isAnonymous: d.boolean("is_anonymous").default(false),
});

export const sessions = betterAuth.table(
  "sessions",
  {
    id: d.uuid("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: d.text("token").notNull().unique(),
    createdAt: timestamp("created_at").notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => new Date().toISOString())
      .notNull(),
    ipAddress: d.text("ip_address"),
    userAgent: d.text("user_agent"),
    userId: d
      .uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    impersonatedBy: d.text("impersonated_by"),
  },
  (table) => [d.index("sessions_userId_idx").on(table.userId)],
);

export const accountProvider = betterAuth.enum(
  "account_provider",
  accountProviders,
);

export const accounts = betterAuth.table(
  "accounts",
  {
    id: d.uuid("id").primaryKey(),
    accountId: d.text("account_id").notNull(),
    providerId: accountProvider("provider_id").notNull(),
    userId: d
      .uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    accessToken: d.text("access_token"),
    refreshToken: d.text("refresh_token"),
    idToken: d.text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: d.text("scope"),
    password: d.text("password"),
    createdAt: timestamp("created_at").notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => new Date().toISOString())
      .notNull(),
  },
  (table) => [d.index("accounts_userId_idx").on(table.userId)],
);

export const verifications = betterAuth.table(
  "verifications",
  {
    id: d.uuid("id").primaryKey(),
    identifier: d.text("identifier").notNull(),
    value: d.text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => new Date().toISOString())
      .notNull(),
  },
  (table) => [d.index("verifications_identifier_idx").on(table.identifier)],
);

export const usersRelations = relations(users, ({ many }) => ({
  sessions: many(sessions),
  accounts: many(accounts),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  users: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
  users: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}));
