import type { NextProxy } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const nextIntlProxy = createMiddleware(routing);

const proxy: NextProxy = (req) => {
  return nextIntlProxy(req);
};

export default proxy;

export const config = {
  matcher: ["/((?!api/|_next/|_vercel/|icon|favicon.ico|.*\\..*).*)"],
};
