// Import QueryClient and QueryFunction types from React Query
import { QueryClient, QueryFunction } from "@tanstack/react-query";

// Helper function to throw an error if the fetch response is not OK (status 2xx)
async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

// Generic API request function for making HTTP requests (GET, POST, etc.)
export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  const res = await fetch(url, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include", // Send cookies with the request
  });

  await throwIfResNotOk(res); // Throw if not OK
  return res;
}

// Type for handling 401 Unauthorized responses in queries
type UnauthorizedBehavior = "returnNull" | "throw";

// Factory function to create a query function for React Query
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    // Fetch data from the URL (first element of queryKey)
    const res = await fetch(queryKey[0] as string, {
      credentials: "include",
    });

    // If 401 and behavior is 'returnNull', return null instead of throwing
    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res); // Throw if not OK
    return await res.json();    // Return parsed JSON
  };

// Create a React Query client with default options for queries and mutations
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }), // Default query function
      refetchInterval: false,                  // Don't refetch on interval
      refetchOnWindowFocus: false,             // Don't refetch on window focus
      staleTime: Infinity,                     // Data never goes stale
      retry: false,                            // Don't retry failed queries
    },
    mutations: {
      retry: false,                            // Don't retry failed mutations
    },
  },
});