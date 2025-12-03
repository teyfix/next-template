"use client";

import {
  defaultShouldDehydrateQuery,
  QueryClient,
  type QueryClientConfig,
  QueryClientProvider,
} from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
import React from "react";

const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      /**
       * Remove unused queries from cache
       * after 30 seconds.
       */
      gcTime: 30 * 1000,
      /**
       * Invalidate queries after 60 seconds.
       */
      staleTime: 60 * 1000,
      /**
       * Self explanatory options
       */
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
    },
    dehydrate: {
      shouldDehydrateQuery: (query) =>
        defaultShouldDehydrateQuery(query) || query.state.status === "pending",
    },
  },
};

const createQueryClient = React.cache(() => {
  return new QueryClient(queryClientConfig);
});

export function ReactQueryProvider(props: PropsWithChildren) {
  return (
    <QueryClientProvider client={createQueryClient()}>
      {props.children}
    </QueryClientProvider>
  );
}
