import { type SQL, sql } from "drizzle-orm";
import type { PgTimestampConfig } from "drizzle-orm/pg-core";
import {
  isoTimestamp,
  type PgTimestampISOStringBuilderInitial,
} from "./iso-timestamp";

export function timestamp(
  config?: PgTimestampConfig<"string">,
): PgTimestampISOStringBuilderInitial<"">;
export function timestamp<TName extends string>(
  name: TName,
  config?: PgTimestampConfig<"string">,
): PgTimestampISOStringBuilderInitial<TName>;
export function timestamp<TName extends string>(
  nameOrConfig?: TName | PgTimestampConfig<"string">,
  config?: PgTimestampConfig<"string">,
):
  | PgTimestampISOStringBuilderInitial<"">
  | PgTimestampISOStringBuilderInitial<TName> {
  if (typeof nameOrConfig === "string") {
    return isoTimestamp(nameOrConfig, { mode: "string", ...config });
  }

  return isoTimestamp({ mode: "string", ...nameOrConfig });
}

export const currentTimestamp = (): SQL<Date> => sql`CURRENT_TIMESTAMP`;
