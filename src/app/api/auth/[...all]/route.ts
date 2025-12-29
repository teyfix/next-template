import { toNextJsHandler } from "better-auth/next-js";
import { ServerConfig } from "@/config/server.config";
import { createAuth } from "@/lib/auth";
import { extractOrigin } from "@/lib/http/extract-origin";

type HttpMethod = "GET" | "POST";
type RequestHandler = (request: Request) => Response | Promise<Response>;

/**
 * Cache for Better Auth handlers, keyed by baseURL.
 * Each origin gets its own auth instance to support dynamic baseURL configuration.
 */
const handlerCache = new Map<string, ReturnType<typeof toNextJsHandler>>();

/**
 * List of allowed origins for Better Auth requests.
 * Requests from origins not in this list will be rejected.
 *
 * @example
 * - "http://localhost:3000"
 * - "https://example.com"
 * - "https://example.com:4000"
 */
const trustedOrigins = ServerConfig.BETTER_AUTH_TRUSTED_ORIGINS;

/**
 * Handles Better Auth requests with dynamic baseURL support.
 *
 * Creates and caches a separate auth handler for each allowed origin,
 * enabling the same auth instance to serve multiple domains correctly.
 *
 * @param method - The HTTP method (GET or POST)
 * @param request - The incoming Next.js request
 * @returns Response object from Better Auth or a 403 Forbidden error
 *
 * @throws Will return 403 if the request origin is not in the allowed list
 */
const handleRequest = async <T extends HttpMethod>(
  method: T,
  request: Request,
): Promise<Response> => {
  const origin = extractOrigin(request);

  if (!origin || !trustedOrigins.includes(origin)) {
    return Response.json(
      { message: "Unknown origin", origin },
      { status: 403, statusText: "Forbidden" },
    );
  }

  let handler = handlerCache.get(origin);

  if (handler == null) {
    handler = toNextJsHandler(createAuth({ baseURL: origin }));
    handlerCache.set(origin, handler);
  }

  return handler[method](request);
};

/**
 * Creates a route handler for the specified HTTP method.
 *
 * @param method - The HTTP method to handle
 * @returns A Next.js route handler function
 */
const createHandler =
  <T extends HttpMethod>(method: T): RequestHandler =>
  (request: Request): Promise<Response> =>
    handleRequest(method, request);

export const GET = createHandler("GET");
export const POST = createHandler("POST");
