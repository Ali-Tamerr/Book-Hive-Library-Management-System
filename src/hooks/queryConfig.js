export const REFETCH_INTERVAL = false;

// Default admin query options. Increased `staleTime` and disabled
// refetch on mount to avoid redundant requests when multiple components
// mount on the same page (e.g. multiple carousels on homepage).
export const adminQueryOptions = {
  staleTime: 5 * 60 * 1000, // 5 minutes
  refetchInterval: REFETCH_INTERVAL,
  refetchIntervalInBackground: false,
  refetchOnWindowFocus: false,
  refetchOnMount: false,
  refetchOnReconnect: true,
  retry: 1,
};
