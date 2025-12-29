import type { Simplify } from "type-fest";
import type { auth } from "../auth";

type Return = NonNullable<Awaited<ReturnType<typeof auth.api.getSession>>>;

export type AppUser = Simplify<Return["user"]>;
export type AppSession = Simplify<Return["session"]>;

export type GetSession = {
  user: AppUser;
  session: AppSession;
};
