export const REFETCH_INTERVAL = 10000; // 10 seconds

// Default admin query options. Increased `staleTime` and disabled
// refetch on mount to avoid redundant requests when multiple components
// mount on the same page (e.g. multiple carousels on homepage).
export const adminQueryOptions = {
  staleTime: Infinity,
  refetchInterval: REFETCH_INTERVAL,
  refetchIntervalInBackground: false,
  refetchOnWindowFocus: true,
  refetchOnMount: false,
  refetchOnReconnect: true,
  retry: 1,
};
