export type RouteProps<P = unknown> = P & {
  params: Promise<Record<string, string | string[]>>;
};
