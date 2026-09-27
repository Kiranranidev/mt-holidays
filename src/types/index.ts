/**
 * Shared domain types.
 * These mirror the shapes the future Express + MongoDB API will return,
 * so swapping mock data for real API responses needs no component changes.
 */

export type HotelCategory = "standard" | "deluxe" | "premium";
export type TransportOption = "none" | "sedan" | "suv" | "tempo";
export type MealPlan = "none" | "breakfast" | "half-board";

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
}

export interface Package {
  id: string;
  slug: string;
  name: string;
  destination: string;
  nights: number;
  days: number;
  /** Confirmed starting price in INR. Not a fixed final price. */
  startingPrice: number;
  shortDescription: string;
  overview: string;
  image: string;
  imageAlt: string;
  /** Placeholder content until the agency supplies final itineraries. */
  itinerary: ItineraryDay[];
  inclusions: string[];
  exclusions: string[];
  /** True while itinerary/inclusions are unconfirmed placeholder content. */
  contentIsPlaceholder: boolean;
}

export interface Destination {
  id: string;
  slug: string;
  name: string;
  state: string;
  tagline: string;
  description: string;
  image: string;
  imageAlt: string;
  bestSeason: string;
  highlights: string[];
  relatedPackageSlugs: string[];
}

export interface PricingRequest {
  packageSlug: string;
  travelers: number;
  nights: number;
  hotelCategory: HotelCategory;
  transport: TransportOption;
  mealPlan: MealPlan;
}

export interface PricingLine {
  label: string;
  amount: number;
  note?: string;
}

export interface PricingResult {
  packageName: string;
  lines: PricingLine[];
  estimatedTotal: number;
  /** True when the figure came from the local demo calculator, not the API. */
  isEstimateOnly: boolean;
}

export interface EnquiryPayload {
  name: string;
  mobile: string;
  email?: string;
  packageSlug?: string;
  travelDate?: string;
  travelers?: number;
  nights?: number;
  message: string;
}

export interface EnquiryResponse {
  reference: string;
  receivedAt: string;
}
