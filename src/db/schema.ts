/**
 * Barrel file for Drizzle schemas.
 *
 * Required to provide the `schema` option to the Drizzle client,
 * enabling typed query helpers such as:
 *   db.query.users.findMany(...)
 */
export * from "./schemas/app.schema";
