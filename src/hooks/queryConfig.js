export const REFETCH_INTERVAL = false;

export const adminQueryOptions = {
  staleTime: 30000,
  refetchInterval: REFETCH_INTERVAL,
  refetchIntervalInBackground: false,
  refetchOnWindowFocus: false,
  refetchOnMount: true,
  refetchOnReconnect: true,
  retry: 1,
};
