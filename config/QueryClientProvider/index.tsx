import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useMemo } from "react";
interface Props {
  children: ReactNode;
}
export function QueryClientConfig({ children }: Props) {
  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            staleTime: 0,
            gcTime: 0,
            retry: (failureCount, error: any) => {
              if (
                error?.response?.status == 401 ||
                error?.response?.status == 404
              ) {
                return false;
              }
              if (error?.response?.status == 403 && failureCount <= 1) {
                return false;
              }

              if (failureCount <= 4) {
                return true;
              }
              return false;
            },
            // onError: (error: any) => ErrorHandle(error, navigate),
          },
          mutations: {
            retry: (failureCount, error: any) => {
              if (
                error?.response?.status == 401 ||
                error?.response?.status == 422 ||
                error?.response?.status == 404 ||
                error?.response?.status == 403
              ) {
                return false;
              }
              if (failureCount <= 4) {
                return true;
              }
              return false;
            },
            // onError: (error: any) => ErrorHandle(error, navigate),
          },
        },
      }),
    [],
  );
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
