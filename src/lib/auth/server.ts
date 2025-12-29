import { headers } from "next/headers";
import { getLocale } from "next-intl/server";
import { type RedirectPath, redirect } from "@/i18n/routing";
import { auth } from "../auth";
import type { AppUser, GetSession } from "./types";

type Nullable<T> = T | null;

export const getServerSession = async (): Promise<Nullable<GetSession>> => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session;
};

export const getServerUser = async (): Promise<Nullable<AppUser>> => {
  const session = await getServerSession();

  if (session == null) {
    return null;
  }

  return session.user;
};

export const getServerAdmin = async (): Promise<boolean> => {
  const user = await getServerUser();

  if (user == null) {
    return false;
  }

  if (user.role === "admin") {
    return true;
  }

  const { error, success } = await auth.api.userHasPermission({
    body: {
      permission: {
        user: ["ban", "delete"],
      },
    },
    headers: await headers(),
  });

  if (error) {
    return false;
  }

  return success;
};

type RedirectOptions = {
  href: RedirectPath;
};

export const requireAuthorized = async (
  opts: Partial<RedirectOptions> = {},
): Promise<GetSession> => {
  const { href = "/auth/login" } = opts;
  const [locale, session] = await Promise.all([
    getLocale(),
    getServerSession(),
  ]);

  if (!session) {
    throw redirect({ href, locale });
  }

  return session;
};

export const requireUnauthorized = async (
  opts: Partial<RedirectOptions> = {},
): Promise<void> => {
  const { href = "/" } = opts;
  const [locale, session] = await Promise.all([
    getLocale(),
    getServerSession(),
  ]);

  if (session) {
    redirect({ href, locale });
  }
};
