import { packages } from "@/data/packages";
import type { PricingRequest, PricingResult } from "@/types";
import { USE_API, apiRequest, mockDelay } from "./apiClient";

/**
 * DEMO PRICING RULES — for UI demonstration only.
 *
 * The frontend is NOT the authority for pricing. Once the backend exists this
 * function calls POST /api/pricing/calculate and MongoDB pricing rules decide
 * the real figures. Only the confirmed starting price and the confirmed
 * ~₹1,500 extra-night rule are real; the option amounts below are placeholders.
 */
const EXTRA_NIGHT_RATE = 1500;

const HOTEL_UPLIFT_PER_NIGHT: Record<PricingRequest["hotelCategory"], number> = {
  standard: 0,
  deluxe: 900,
  premium: 1800,
};

const TRANSPORT_PER_DAY: Record<PricingRequest["transport"], number> = {
  none: 0,
  sedan: 1800,
  suv: 2600,
  tempo: 3600,
};

const MEALS_PER_PERSON_PER_NIGHT: Record<PricingRequest["mealPlan"], number> = {
  none: 0,
  breakfast: 250,
  "half-board": 550,
};

const HOTEL_LABEL: Record<PricingRequest["hotelCategory"], string> = {
  standard: "Standard hotel",
  deluxe: "Deluxe hotel",
  premium: "Premium hotel",
};

const TRANSPORT_LABEL: Record<PricingRequest["transport"], string> = {
  none: "No vehicle",
  sedan: "Sedan",
  suv: "SUV",
  tempo: "Tempo traveller",
};

const MEAL_LABEL: Record<PricingRequest["mealPlan"], string> = {
  none: "No meal plan",
  breakfast: "Breakfast only",
  "half-board": "Breakfast and dinner",
};

/** POST /api/pricing/calculate */
export async function calculatePricing(request: PricingRequest): Promise<PricingResult> {
  if (USE_API) {
    return apiRequest<PricingResult>("/api/pricing/calculate", {
      method: "POST",
      body: JSON.stringify(request),
    });
  }

  const selected = packages.find((item) => item.slug === request.packageSlug);
  if (!selected) {
    throw new Error("Unknown package");
  }

  const travelers = Math.max(1, request.travelers);
  const nights = Math.max(1, request.nights);
  const extraNights = Math.max(0, nights - selected.nights);

  const base = selected.startingPrice * travelers;
  const extraNightCharge = extraNights * EXTRA_NIGHT_RATE * travelers;
  const hotelUplift = HOTEL_UPLIFT_PER_NIGHT[request.hotelCategory] * nights;
  const transportCharge = TRANSPORT_PER_DAY[request.transport] * (nights + 1);
  const mealCharge = MEALS_PER_PERSON_PER_NIGHT[request.mealPlan] * nights * travelers;

  const lines = [
    {
      label: `Base package (${travelers} ${travelers === 1 ? "traveller" : "travellers"})`,
      amount: base,
      note: `Starting ${selected.nights}N / ${selected.days}D rate per person`,
    },
    {
      label: `Extra nights (${extraNights})`,
      amount: extraNightCharge,
      note: "Approximately ₹1,500 per extra night, per traveller",
    },
    {
      label: HOTEL_LABEL[request.hotelCategory],
      amount: hotelUplift,
      note: "Indicative category uplift",
    },
    {
      label: TRANSPORT_LABEL[request.transport],
      amount: transportCharge,
      note: "Indicative vehicle charge",
    },
    {
      label: MEAL_LABEL[request.mealPlan],
      amount: mealCharge,
      note: "Indicative meal charge",
    },
  ];

  const estimatedTotal = lines.reduce((sum, line) => sum + line.amount, 0);

  return mockDelay({
    packageName: selected.name,
    lines,
    estimatedTotal,
    isEstimateOnly: true,
  });
}
