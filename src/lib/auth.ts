import { type BetterAuthOptions, betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { admin, anonymous } from "better-auth/plugins";
import type { Merge } from "type-fest";
import { v7 } from "uuid";
import { ServerConfig } from "@/config/server.config";
import { db } from "@/db/drizzle"; // your drizzle instance
import * as schema from "@/db/schemas/auth.schema";

/**
 * Type-safe wrapper for defining Better Auth configuration objects.
 * Provides type inference and validation without runtime overhead.
 *
 * @template Options - The Better Auth options type
 * @param options - Configuration options for Better Auth
 * @returns The same options object with proper typing
 */
const createConfig = <Options extends BetterAuthOptions>(
  options: Options,
): Options => options;

/**
 * Default base URL for Better Auth endpoints.
 * Uses the first trusted origin from the server configuration.
 */
const [defaultBaseURL] = ServerConfig.BETTER_AUTH_TRUSTED_ORIGINS;

/**
 * Base configuration for Better Auth.
 * Contains all shared settings that will be used across all auth instances.
 */
const baseAuthConfig = createConfig({
  advanced: {
    database: {
      generateId: () => v7(),
    },
    useSecureCookies: true,
  },
  baseURL: defaultBaseURL,
  basePath: "/api/auth",
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
    usePlural: true,
  }),
  emailAndPassword: {
    enabled: false,
  },
  plugins: [
    admin({
      adminUserIds: ServerConfig.BETTER_AUTH_ADMIN_USER_IDS,
    }),
    anonymous({
      emailDomainName: ServerConfig.BETTER_AUTH_ANON_EMAIL_DOMAIN,
    }),
    nextCookies(),
  ],
  secret: ServerConfig.BETTER_AUTH_SECRET,
  socialProviders: {
    google: {
      clientId: ServerConfig.GOOGLE_CLIENT_ID,
      clientSecret: ServerConfig.GOOGLE_CLIENT_SECRET,
    },
  },
  trustedOrigins: ServerConfig.BETTER_AUTH_TRUSTED_ORIGINS,
});

/**
 * Type representing the base auth configuration.
 * Used for type inference when extending configuration.
 */
type BaseAuthConfig = typeof baseAuthConfig;

/**
 * Extends the base auth configuration with additional options.
 * Allows overriding base configuration on a per-instance basis.
 *
 * @template Options - Additional options to merge with base config
 * @param options - Custom configuration options to extend base config
 * @returns Merged configuration combining base and custom options
 *
 * @example
 * const customAuth = extendAuthConfig({
 *   baseURL: "https://custom-domain.com",
 * });
 */
const extendConfig = <Options extends BetterAuthOptions>(
  options: Options,
): Merge<BaseAuthConfig, Options> => ({ ...baseAuthConfig, ...options });

/**
 * Creates a Better Auth instance with extended configuration.
 * Allows overriding base configuration on a per-instance basis.
 *
 * @param options - Additional options to merge with base configuration
 * @returns Configured Better Auth instance
 *
 * @example
 * // Create auth instance with custom baseURL
 * const auth = createAuth({
 *   baseURL: "https://dev.gateway.127-0-0-1.sslip.io"
 * });
 *
 * @example
 * // Create auth instance with default configuration
 * const auth = createAuth({});
 */
export const createAuth = <Options extends BetterAuthOptions>(
  options: Options,
) => betterAuth(extendConfig(options));

/**
 * Default Better Auth instance using base configuration.
 * This is the primary auth instance used when no custom configuration is needed.
 *
 * For dynamic baseURL support (e.g., behind reverse proxies), create new instances
 * using `createAuth({ baseURL })` instead of using this default instance.
 */
export const auth = createAuth({});

export type AuthOptions = typeof auth.options;

export type SocialProvider = keyof AuthOptions["socialProviders"];
export type AccountProvider = SocialProvider;
