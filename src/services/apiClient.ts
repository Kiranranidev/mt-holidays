/**
 * Single place where HTTP access is configured.
 *
 * Today every service resolves mock data locally. When the Express + MongoDB
 * API is ready, set VITE_API_BASE_URL and switch the `USE_API` flag below to
 * true — no component needs to change.
 */

export const API_BASE_URL = import.meta.env["VITE_API_BASE_URL"] ?? "";

/** Flip to true once the REST API is deployed. */
export const USE_API = false;

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status?: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/** Generic JSON request helper for the future REST API. */
export async function apiRequest<TResponse>(
  path: string,
  init?: RequestInit,
): Promise<TResponse> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
    ...init,
  });

  if (!response.ok) {
    throw new ApiError("Request failed", response.status);
  }

  return (await response.json()) as TResponse;
}

/** Small delay so loading states are visible while we are still on mock data. */
export function mockDelay<T>(value: T, ms = 220): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}
