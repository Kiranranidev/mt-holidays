import { destinations } from "@/data/destinations";
import type { Destination } from "@/types";
import { USE_API, apiRequest, mockDelay } from "./apiClient";

/** GET /api/destinations */
export async function getDestinations(): Promise<Destination[]> {
  if (USE_API) return apiRequest<Destination[]>("/api/destinations");
  return mockDelay(destinations);
}

/** GET /api/destinations/:slug */
export async function getDestinationBySlug(slug: string): Promise<Destination | null> {
  if (USE_API) return apiRequest<Destination | null>(`/api/destinations/${slug}`);
  return mockDelay(destinations.find((item) => item.slug === slug) ?? null);
}

export const destinationQueries = {
  all: () => ({ queryKey: ["destinations"] as const, queryFn: getDestinations }),
  bySlug: (slug: string) => ({
    queryKey: ["destinations", slug] as const,
    queryFn: () => getDestinationBySlug(slug),
  }),
};
