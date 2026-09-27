import { packages } from "@/data/packages";
import type { Package } from "@/types";
import { USE_API, apiRequest, mockDelay } from "./apiClient";

/** GET /api/packages */
export async function getPackages(): Promise<Package[]> {
  if (USE_API) return apiRequest<Package[]>("/api/packages");
  return mockDelay(packages);
}

/** GET /api/packages/:slug */
export async function getPackageBySlug(slug: string): Promise<Package | null> {
  if (USE_API) return apiRequest<Package | null>(`/api/packages/${slug}`);
  return mockDelay(packages.find((item) => item.slug === slug) ?? null);
}

/** Homepage selection. The backend can later expose a `featured` flag. */
export async function getFeaturedPackages(): Promise<Package[]> {
  const all = await getPackages();
  return all.slice(0, 3);
}

export const packageQueries = {
  all: () => ({ queryKey: ["packages"] as const, queryFn: getPackages }),
  bySlug: (slug: string) => ({
    queryKey: ["packages", slug] as const,
    queryFn: () => getPackageBySlug(slug),
  }),
  featured: () => ({ queryKey: ["packages", "featured"] as const, queryFn: getFeaturedPackages }),
};
