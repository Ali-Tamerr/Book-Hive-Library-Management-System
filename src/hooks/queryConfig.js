export const REFETCH_INTERVAL = 5000;

export const adminQueryOptions = {
  staleTime: 2000,
  refetchInterval: REFETCH_INTERVAL,
  refetchIntervalInBackground: false,
  refetchOnWindowFocus: true,
  refetchOnMount: true,
  refetchOnReconnect: true,
};
