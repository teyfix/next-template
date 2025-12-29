/**
 * Extracts the origin from proxy forwarded headers.
 * Used when the application is behind a reverse proxy (e.g., Traefik, nginx, Cloudflare).
 *
 * Constructs the origin from the following headers:
 * - `x-forwarded-proto`: The protocol (http/https)
 * - `x-forwarded-host`: The hostname
 * - `x-forwarded-port`: The port (defaults to 443 for https, 80 for http)
 *
 * @param request - The incoming request
 * @returns The reconstructed origin, or null if required headers are missing or invalid
 *
 * @example
 * // Request with forwarded headers
 * fromProxyHeader(request) // => "https://dev.gateway.127-0-0-1.sslip.io"
 *
 * @example
 * // Request missing forwarded headers
 * fromProxyHeader(request) // => null
 */
const fromProxyHeader = (request: Request): string | null => {
  const headers = ["x-forwarded-proto", "x-forwarded-host", "x-forwarded-port"];
  let [proto, host, port] = headers.map((header) =>
    request.headers.get(header),
  );

  // Both protocol and host are required
  if (proto == null || host == null) {
    return null;
  }

  // Use standard ports if not explicitly set
  if (port == null) {
    port = proto === "https" ? "443" : "80";
  }

  try {
    return new URL(`${proto}://${host}:${port}`).origin;
  } catch {
    // Invalid URL construction (malformed headers)
    return null;
  }
};

/**
 * Extracts the origin from the `Origin` request header.
 * The Origin header is automatically sent by browsers in cross-origin requests (CORS).
 *
 * @param request - The incoming request
 * @returns The origin from the header, or null if not present
 *
 * @example
 * // CORS request from a browser
 * fromOriginHeader(request) // => "http://localhost:3000"
 *
 * @example
 * // Server-to-server request (no Origin header)
 * fromOriginHeader(request) // => null
 */
const fromOriginHeader = (request: Request): string | null =>
  request.headers.get("origin");

/**
 * Extracts the origin from the request URL itself.
 * Used as a fallback when no proxy headers or Origin header are present.
 *
 * @param request - The incoming request
 * @returns The origin from the request URL, or null if URL is malformed
 *
 * @example
 * // Direct request to the server
 * fromURL(request) // => "http://localhost:3000"
 *
 * @example
 * // Malformed request URL
 * fromURL(request) // => null
 */
const fromURL = (request: Request): string | null => {
  try {
    return new URL(request.url).origin;
  } catch {
    // Malformed request URL
    return null;
  }
};

/**
 * Extracts the origin from a request using multiple fallback strategies.
 *
 * Attempts to determine the origin in the following priority order:
 * 1. Proxy forwarded headers (x-forwarded-proto, x-forwarded-host, x-forwarded-port)
 * 2. Origin request header (from CORS requests)
 * 3. Request URL origin (direct requests)
 *
 * This approach ensures the correct origin is extracted regardless of whether the
 * application is behind a reverse proxy, receiving CORS requests, or handling direct requests.
 *
 * @param request - The incoming request
 * @returns The extracted origin, or null if none of the strategies succeed
 *
 * @example
 * // Behind reverse proxy with forwarded headers
 * extractOrigin(request) // => "https://example.com"
 *
 * @example
 * // Browser CORS request without proxy
 * extractOrigin(request) // => "http://localhost:3000"
 *
 * @example
 * // Direct local request
 * extractOrigin(request) // => "http://127.0.0.1:3000"
 */
export const extractOrigin = (request: Request): string | null =>
  fromProxyHeader(request) || fromOriginHeader(request) || fromURL(request);
